Template.forgotPassword.events({
    'click #passwordReset': function(event){
        event.preventDefault();
        toastr.info("Reset de senha requisitado...")
        var truckEmail = $('#truckEmail').val();
        if(truckEmail) {
            Accounts.forgotPassword({email: truckEmail}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        toastr.error('Este usuário não existe');

                    } else {
                        toastr.error('Alguma coisa deu errado');
                        console.log(err)
                    }
                } else {
                    toastr.success('Email enviado. De numa olhadinha em sua caixa de entrada');
                }
            });
        }
    }
});