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
    this.next()
    // if(Meteor.user()){
    //   if(user['emails'][0]['address'] != key.adminEmail){
    //     this.render('home');
    //   } else {
    //     this.next();
    //   }
    // } else {
    //   this.next();
    // }
  }
})