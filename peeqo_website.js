Emails = new Mongo.Collection("emails");

// sendgrid api = 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

if (Meteor.isClient) {

  Meteor.subscribe('emails');

  Template.subscriberList.helpers({
    "emails": function(){
      return Emails.find({}); 
    }
  })

  Template.signup.events({
    'submit form': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
      var email = event.target.email.value;
      Meteor.call("saveEmail", email, function(err, result){
        console.log(result) 
      });
    }
  });

  Template.subscriberList.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
    }
  })

  Template.login.events({
    'submit form': function(event){
      event.preventDefault();
      var email = event.target.adminEmail.value;
      var pass = event.target.adminPassword.value;

      Meteor.loginWithPassword(email, pass, function(err){
        if(err){
          console.log("Access denied");
        } else {
          Router.go('admin')
        }
      });
    }
  })
}

if (Meteor.isServer) {

  Meteor.startup(function(){
    process.env.MAIL_URL = 'smtp://postmaster@sandboxb179e336a1664590b1279d4409dbb3e5.mailgun.org:1ac9fd9f708c626dd29bf27bcfe42932@smtp.mailgun.org:587'
  
    if(Meteor.users.find().count() == 0){
      Accounts.createUser({
        email: 'a@2.com',
        password: '123456'
      })

      console.log('creating admin');

    } else {
      console.log("admin already assigned")
    }
  })

  Meteor.publish('emails', function(){
    return Emails.find();
  })

  Meteor.methods({
      "saveEmail": function(email){

        if(Emails.findOne({email:email})){
          return "repeated"
        } else {
          Emails.insert({
            "email": email,
            "createdAt": new Date()
          })

          Email.send({
            from: "peeqo@peeqo.com",
            to: "abhishek3188@gmail.com", //replace this with the email var
            subject: "Hello from sendgrid",
            text: "This is working"
          });

          return "success"
        }
        
      }

  })
}

Router.configure({
  'layoutTemplate': 'main'
})

Router.route('/',{
  name: "home",
  template: "home"
})


Router.route('/nimda', {
  name:'admin',
  template: 'admin',
  onBeforeAction: function(){
    var user = Meteor.user();

    if(Meteor.user()){
      if(user['emails'][0]['address'] != 'a@2.com'){
        this.render('home');
      } else {
        this.next();
      }
    } else {
      this.next();
    }
  }
})
