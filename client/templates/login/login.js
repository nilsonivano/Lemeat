Template.login.onRendered(function () {
    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
        body.removeClass();
        body.addClass("hold-transition login-page");

        $(function () {
            MeteorAdminLTE.run()
        });
    }
});

Template.login.events({
    'submit form':function(event){
        event.preventDefault();
        var truckEmail = $('[name=truckEmail]').val();
        var truckPassword = $('[name=truckPassword]').val();
        Meteor.loginWithPassword(truckEmail, truckPassword,function(error){
            if(error){
                console.log(error);
            }else{
                Router.go('truckInformation');
            }
        });
        }
});