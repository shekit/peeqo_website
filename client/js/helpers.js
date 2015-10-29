Template.subscriberList.helpers({
  "emails": function(){
    return Emails.find({}, {sort:{createdAt:-1}}); 
  },

  "count": function(){
    return Emails.find({}).count();
  }
})