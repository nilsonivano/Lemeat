Template.appLayout.events({
    'click .dropdown-toggle': function(){
        $('.dropdown-toggle').dropdown();
    },
    'click #logout': function(){
        Meteor.logout(function(err){
            if(err){
                console.log(err.reason);
            }
            else{
                Router.go('login');
            }
        });
    }
});

Template.appLayout.helpers({
    'user': function(){
        return Meteor.user();
    }
});