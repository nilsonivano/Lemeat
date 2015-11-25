Template.appLayout.onRendered(function () {
    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
        body.removeClass();
        body.addClass("skin-blue-light sidebar-mini");

        $(function() {
            MeteorAdminLTE.run()
        });
    }
});

Template.appLayout.events({
    'click #menuToggle': function(){
        $("#menuToggle").toggleClass("open");
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