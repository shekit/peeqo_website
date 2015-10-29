key = Meteor.settings;

Meteor.startup(function(){
    process.env.MAIL_URL = 'smtp://postmaster@sandboxb179e336a1664590b1279d4409dbb3e5.mailgun.org:1ac9fd9f708c626dd29bf27bcfe42932@smtp.mailgun.org:587'
  
    if(Meteor.users.find().count() == 0){
      Accounts.createUser({
        email: key.adminEmail,
        password: key.adminPassword
      })

      console.log('creating admin');

    } else {
      console.log("admin already assigned")
    }
})

var subscriberCountEmail = new Cron(function(){
    console.log("sending email subscriber count")
    var date = new Date();
    date.setHours(0,0,0,0); //set date to start of the day
    var todaysSubscribers = Emails.find({createdAt:{$gte:date}}).count();

    var subject = "Todays Signup count: " + todaysSubscribers;
    Email.send({
      to: 'abhishek3188@gmail.com',
      from: 'subscribercount@peeqo.com',
      subject: subject,
      text: ''
    });
  }, {
    minute: 23,
    hour: 00
})

Meteor.methods({
  "saveEmail": function(email){

    if(Emails.findOne({email:email})){
      return "repeated"
    } else {
      Emails.insert({
        "email": email,
        "createdAt": new Date(),
      })

      Email.send({
        from: "hi@peeqo.com",
        to: "abhishek3188@gmail.com", //replace this with the email var
        subject: "Hello from sendgrid",
        text: "This is working"
      });

      return "success"
    }
    
  },

  "downloadList": function(){
    var collection = Emails.find().fetch();
    var heading = true;
    var delimiter = ',';
    return exportcsv.exportToCSV(collection, heading, delimiter)
  }

})