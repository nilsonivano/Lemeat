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