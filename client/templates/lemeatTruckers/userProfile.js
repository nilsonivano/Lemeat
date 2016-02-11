Template.userProfile.events({
    'click #passwordChange': function(event){
        event.preventDefault();
        var oldPass = $('#oldPassword').val();
        var newPass = $('#newPassword').val();
        var confirmNewPass = $('#confirmNewPassword').val();
        if(Meteor.userId() && newPass == confirmNewPass){
            Accounts.changePassword(oldPass, newPass, function(err){
                if(err){
                    toastr.error("Erro ao modificar senha");
                } else{
                    toastr.success("Senha alterada com sucesso");
                }
            })
        } else{
            toastr.error("Senha nova e confirmação de senha devem ser idênticas");
        }

    }
});