//SyncedCron.add({
//    name: 'Send email to users with incomplete profile after 1 day',
//    schedule: function(parser) {
//        // parser is a later.parse object
//        return parser.text('every 30 seconds');
//    },
//    job: function() {
//        var currentTime = new Date();
//        var users = Meteor.users.find().fetch();
//        for (i in users){
//            var userId = users[i]._id;
//            var userEmail = users[i].email;
//            var truckName = users[i].name;
//            var truckSpeciality = users[i].profile.speciality;
//            var truckCity = users[i].profile.mainCity;
//            var truckImg = users[i].profile.img;
//            var truckDescription = users[i].profile.description;
//            var profileComplete;
//            var listEmailSent = users[i].profile.userSettings.profileComplete;
//            if(!truckSpeciality || !truckCity || !truckImg || !truckDescription){
//                profileComplete = false;
//                Meteor.users.update({_id: userId},{$set: {"profile.userSettings.profileComplete": false}})
//            } else {
//                profileComplete = true;
//                Meteor.users.update({_id: userId},{$set: {"profile.userSettings.profileComplete": true}})
//            }
//            var truckCreatedDate = users[i].createdAt;
//            var timeDiff = Math.abs(currentTime.getTime() - truckCreatedDate.getTime());
//            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//            if(diffDays > 1 &&
//                profileComplete == false &&
//                listEmailSent.indexOf("IncompleteProfile1Day") == -1){
//                //send email
//                var html =
//                    '<div>' + 'Olá ' + truckName + ', verificamos que você ainda não completou seu perfil no Lemeat.' + '</div>' +
//                    '<div>' + 'Acesse www.lemeat.com/login e complete hoje seu perfil!' + '</div>' +
//                    '<div>' + 'Não se esqueça de atualizar também sua agenda semanal para que seus clientes possam lhe encontrar com mais facilidade!' + '</div>' +
//                    '<div>' + 'Faça parte desta comunidade!' + '</div>';
//                Email.send({
//                    to: userEmail,
//                    from: 'contato@lemeat.com',
//                    subject: 'Complete seu perfil no Lemeat e veja as oportunidades que temos para você',
//                    html: html
//                });
//                //update list Email Sent
//                Meteor.user().update({_id: userId},{$push: {"userSettings.listEmailSent": "IncompleteProfile1Day"}});
//            }
//        }
//    }
//});
//
//SyncedCron.start();
//
