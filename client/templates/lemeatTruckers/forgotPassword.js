Template.forgotPassword.onCreated(function(){
    require('/imports/styles/bootstrap.css');
    require('/imports/styles/AdminLTE.css');
    require('/imports/plugins/bootstrap.js');
    require('/imports/plugins/adminLTE.js');
});

Template.forgotPassword.events({
    'click #passwordReset': function(event){
        event.preventDefault();
        var truckEmail = $('#truckEmail').val();
        if(truckEmail) {
            toastr.info("Reset de senha requisitado...");
            Accounts.forgotPassword({email: truckEmail}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        toastr.error('Este usuário não existe');

                    } else {
                        toastr.error('Alguma coisa deu errado');
                        console.log(err)
                    }
                } else {
                    toastr.success('Reset de senha enviado. De numa olhadinha em sua caixa de entrada');
                }
            });
        }
    }
});