Template.login.onCreated(function(){
    require('/imports/styles/bootstrap.css');
    require('/imports/styles/AdminLTE.css');
    require('/imports/plugins/bootstrap.js');
    require('/imports/plugins/adminLTE.js');

    if (Meteor.userId()) {
        Router.go('truckInformation')
    }
});

Template.login.events({
    'submit form':function(event){
        event.preventDefault();
        var truckEmail = $('[name=truckEmail]').val();
        var truckPassword = $('[name=truckPassword]').val();
        Meteor.loginWithPassword(truckEmail, truckPassword,function(error){
            if(error){
                toastr.error(error.reason);
            }else{
                Router.go('truckInformation');
            }
        });
    }
});