Emails = new Mongo.Collection("emails");

// sendgrid api = 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

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.home.helpers({
    "emails": function(){
      return Emails.find({}); 
    }
  })

  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Meteor.call("saveEmail", "abhishek", function(err, result){
        console.log(result) 
      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function(){
    process.env.MAIL_URL = 'smtp://postmaster@sandboxb179e336a1664590b1279d4409dbb3e5.mailgun.org:1ac9fd9f708c626dd29bf27bcfe42932@smtp.mailgun.org:587'
  
    if(Meteor.users.find().count() == 0){
      Accounts.createUser({
        email: 'a@2.com',
        password: '123456'
      })
    } else {
      console.log("admin already assigned")
    }
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
            to: "abhishek3188@gmail.com",
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

Router.onBeforeAction(function(){
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

}, {
  only: ['admin']
});

Router.route('/',{
  name: "home",
  template: "home"
})

Router.route('/login',{
  name: "login",
  template: "login"
})

Router.route('/nimda', {
  name:'admin',
  template: 'admin',
  // onBeforeAction: function(){
  //   var user = Meteor.user();

  //   if(user['emails'][0]['address'] != 'a@2.com'){
  //     this.render('home')
  //   } else {
  //     this.next();
  //   }
  // }
})
