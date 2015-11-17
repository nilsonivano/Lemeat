Template.truckInformation.onCreated(function(){
    Blaze._allowJavascriptUrls();
});

Template.truckInformation.events({
    'click #saveTruckInformation': function(){
        var currentUser = Meteor.userId();
        //Informações do card
        var truckName = $('[id=truckName]').val();
        var truckSpeciality = $('[id=truckSpeciality]').val();
        var truckDescription = $('[id=truckDescription]').val();
        var truckMenu = $('[id=truckMenu]').val();

        //Contatos
        var truckFacebook = $('[id=truckFacebook]').val();
        var truckInstagram = $('[id=truckInstagram]').val();
        var truckSite = $('[id=truckSite]').val();
        var truckPhone = $('[id=truckPhone]').val();
        var truckTwitter = $('[id=truckTwitter]').val();
        var truckEmail = $('[id=truckEmail]').val();

        //CardImg
        var truckCardImgUrl = truckCardImg.findOne({addedBy: Meteor.userId()}).url();
        var contacts = {
            facebook: truckFacebook,
            instagram: truckInstagram,
            twitter: truckTwitter,
            site: truckSite,
            email: truckEmail,
            phone: truckPhone
        };

        console.log(truckName,truckSpeciality,truckDescription,contacts);

        Meteor.users.update(currentUser,{$set:{
            "profile.truckName": truckName,
            "profile.truckSpeciality": truckSpeciality,
            "profile.truckDescription": truckDescription,
            "profile.truckContacts": contacts,
            "profile.truckMenu": truckMenu,
            "profile.truckCardImgUrl": truckCardImgUrl
        }},function(error){
            if(error){
                console.log(error);
            } else {
                console.log(Meteor.user().profile);
                $('[id=alertSuccess]').removeClass('hidden');
                //setTimeout(function(){
                //    $('[id=alertSuccess]').addClass('hidden');
                //},2000);
            }
        });


    }
});

Template.truckInformation.helpers({
    'truckInformation': function(){
        return Meteor.user()
    }
})
