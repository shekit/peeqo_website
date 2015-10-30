Template.wordCycle.onRendered(function(){
  var words = ['delightful','rad','crazy','hip','one-of-a-kind','tiny','charming','groovy','entertaining','funny','cheerful','perfect','amazing','spunky'];
  var count = 0;
  setInterval(function(){
    $(".word").html(words[count]);
    count++;
    if(count == words.length){
      count = 0
    }
  },700)
});

Template.signup.events({
  'submit form': function (event) {
    // increment the counter when button is clicked
    event.preventDefault();
    var email = event.target.email.value;

    if(email){
      Meteor.call("saveEmail", email, function(err, result){
        console.log(result) 
      });
    }
  }
});

Template.subscriberList.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
  },

  'click .download-list': function(event){
    event.preventDefault();
    var fileName = 'list.csv';
    Meteor.call('downloadList', function(err, fileContent){
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, fileName);
      }
    })
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

