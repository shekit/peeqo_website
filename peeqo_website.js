Emails = new Mongo.Collection("emails");

// sendgrid api = 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

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    "emails": function(){
      return Emails.find({}); 
    }
  })

  Template.hello.events({
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
