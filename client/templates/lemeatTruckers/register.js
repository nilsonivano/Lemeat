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
                    var html =
                        '<div>' + 'Olá ' + truckName + ', obrigado por realizar seu cadastro no Lemeat.' + '</div>' +
                        '<div>' + 'Pedimos que você atualize todas suas informações de seu truck em nossa plataforma para receber informações sobre eventos, casamentos e outros tipos de oportunidade.' + '</div>' +
                        '<div>' + 'Atualize regularmente sua agenda no Lemeat, para que seus clientes possam te encontrar de maneira mais fácil.' + '</div>' +
                        '<div>' + 'Se ainda tiver alguma dúvida, não existe em nos contatar no <b>contato@lemeat.com</b>' + '</div>';
                    Meteor.call('sendEmail',
                        truckEmail,
                        'contato@lemeat.com',
                        'Bem vindo ao Lemeat',
                        html);
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