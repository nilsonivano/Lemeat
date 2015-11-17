Template.register.events({
    'submit form':function(event){
        event.preventDefault();
        var truckName = $('[name=truckName]').val();
        var truckEmail = $('[name=truckEmail]').val();
        var truckPassword = $('[name=truckPassword]').val();
        var truckPasswordAgain = $('[name=truckPasswordAgain]').val();
        var truckProfile = {
            truckName: truckName
        };
        if(truckPassword == truckPasswordAgain){
            Accounts.createUser({
                email: truckEmail,
                password: truckPassword,
                profile: truckProfile
            }, function (error) {
                if(error){
                    console.log(error);
                }else{
                    Router.go('truckInformation');
                }
            });
        }
    }
});