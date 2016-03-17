Template.appLayout.events({
    'click #menuToggle': function(){
        $('body').toggleClass("sidebar-open");
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
    },
    'countEventsMenu': function(){
        return ReactiveMethod.call('getValidEventsCount');
    }
});