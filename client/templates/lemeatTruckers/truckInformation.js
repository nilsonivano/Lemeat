Template.truckInformation.onCreated(function(){
    Blaze._allowJavascriptUrls();
    if (!Meteor.userId()) {
        Router.go('login')
    }
});

Template.truckInformation.onRendered(function(){
    var tags = Meteor.user().profile.tags;
    $(".select2").select2({
        data: tagsLemeat,
        tags: true
    });
    $(".select2").val(tags).trigger("change");
});

Template.truckInformation.events({
    'click #saveTruckInformation': function(){
        var currentUser = Meteor.userId();
        //Informações do card
        var truckName = $('[id=truckName]').val();
        var truckSpeciality = $('[id=truckSpeciality]').val();
        var truckDescription = $('[id=truckDescription]').val();
        var truckMenu = $('[id=truckMenu]').val();
        var truckMainCity = $('[id=truckMainCity]').val();
        var truckTags = $('[id=truckTags]').val();
        //Contatos
        var truckFacebook = $('[id=truckFacebook]').val();
        var truckInstagram = $('[id=truckInstagram]').val();
        var truckSite = $('[id=truckWebSite]').val();
        var truckPhone = $('[id=truckPhone]').val();
        var truckTwitter = $('[id=truckTwitter]').val();
        var truckEmail = $('[id=truckEmail]').val();

        //CardImg
        var truckCardImgUrl = truckCardImg.findOne({addedBy: Meteor.userId()}).url();
        var contacts = {
            facebook: truckFacebook,
            instagram: truckInstagram,
            twitter: truckTwitter,
            website: truckSite,
            email: truckEmail,
            phone: truckPhone
        };

        Meteor.users.update(currentUser,{$set:{
            "profile.name": truckName,
            "profile.speciality": truckSpeciality,
            "profile.description": truckDescription,
            "profile.mainCity": truckMainCity,
            "profile.tags": truckTags,
            "profile.contacts": contacts,
            "profile.menu": truckMenu,
            "profile.img": truckCardImgUrl
        }},function(error){
            if(error){
                toastr.error("Alguma coisa deu errado na hora de salvar");
            } else {
                toastr.success("Informações salvas com sucesso");
            }
        });
    }
});

Template.truckInformation.helpers({
    'truckInformation': function(){
        if(Meteor.user())
        return Meteor.user().profile
    },
    'truckId': function(){
        return Meteor.userId()
    }
});