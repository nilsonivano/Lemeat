Template.register.events({
    'submit form':function(event){
        event.preventDefault();
        var truckName = $('[name=truckName]').val();
        var truckEmail = $('[name=truckEmail]').val();
        var truckPassword = $('[name=truckPassword]').val();
        var truckPasswordAgain = $('[name=truckPasswordAgain]').val();
        if(truckPassword == truckPasswordAgain){
            Meteor.call('userRegister',truckEmail,truckPassword,truckName, function(error,results){
                if (error){
                    toastr.error(error.reason)
                } else{
                    Meteor.loginWithPassword(truckEmail,truckPassword,function(){
                        if(error){
                            toastr.error(error.reason)
                        } else{
                            Router.go('truckInformation')
                        }
                    })
                }
            });
        } else {
            toastr.error("Confira novamente sua senha")
        }
    }
});