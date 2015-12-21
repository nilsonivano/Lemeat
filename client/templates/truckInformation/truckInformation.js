Template.truckInformation.onCreated(function(){
    Blaze._allowJavascriptUrls();
    if (!Meteor.userId()) {
        Router.go('login')
    }
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
        return Meteor.user().profile
    }
});

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};