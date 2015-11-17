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

Template.appLayout.helpers({
    'user': function(){
        return Meteor.user();
    }
})