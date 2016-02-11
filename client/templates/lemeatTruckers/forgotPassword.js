Template.forgotPassword.events({
    'click #passwordReset': function(event){
        event.preventDefault();
        var truckEmail = $('#truckEmail').val();
        Accounts.forgotPassword({email: truckEmail}, function(err){
            if(err){
                console.log(err);
                toastr.error("Não conseguimos enviar o reset de senha")
            } else{
                toastr.success("Reset de senha enviado. Confira seu e-mail")
            }
        })
    }
});