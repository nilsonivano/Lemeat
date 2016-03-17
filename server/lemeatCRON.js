SyncedCron.add({
    name: 'Send email to trucks without week agenda',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 10:48 am every weds');
    },
    job: function() {
        var users = Meteor.users.find().fetch();
        for (i in users){
            var truckName = users[i].profile.name;
            var userEmail = users[i].emails[0].address;
            var currentTime = new Date();
            var userId = users[i]._id;
            var userAgenda = truckAgenda.find({addedBy: userId,dateEnd: {$gt: currentTime}}).count();
            console.log(truckName, userAgenda, userEmail);
            if(userAgenda == 0 && userEmail){
                var html =
                    '<div>' + 'Olá ' + truckName + ', verificamos que você ainda não atualizou esta semana a sua agenda no Lemeat.' + '</div>' +
                    '<div>' + 'Acesse www.lemeat.com/login e atualize sua agenda para divulgar seu itinerário para seus fans!' + '</div>' +
                    '<div>' + 'Temos também algumas oportunidades listadas em nossa plataforma para te ajudar a preencher sua agenda para as próximas semanas.' +
                    'Voce pode visualizá-las em nosso menu de Oportunidades/Eventos' + '</div>' +
                    '<div>' + 'Faça parte desta comunidade!' + '</div>';
                Email.send({
                    to: userEmail,
                    from: 'contato@lemeat.com',
                    subject: 'Atualize a sua agenda semanal no Lemeat',
                    html: html
                });
                console.log(html)
            }
        }
    }
});

SyncedCron.start();

