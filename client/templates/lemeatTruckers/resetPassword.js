Template.resetPassword.onRendered(function(){
   Session.set('resetToken', Router.current().params.token);
});

Template.resetPassword.events({
    'click #passwordReset': function(event){
        event.preventDefault();
        var token = Session.get('resetToken');
        var newPassword = $('#newPassword').val();
        var confirmNewPass = $('#confirmNewPassword').val();
        if(newPassword && newPassword == confirmNewPass){
            Accounts.resetPassword(token, newPassword, function(err){
                if(err){
                    toastr.error("Erro ao modificar senha");
                } else{
                    toastr.success("Senha alterada com sucesso, redirecionando...");
                    Router.go('truckInformation')
                }
            })
        } else{
            toastr.error("Senha nova e confirmação de senha devem ser idênticas");
        }
    }
})