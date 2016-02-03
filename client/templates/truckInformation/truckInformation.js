Template.truckInformation.onCreated(function(){
    Blaze._allowJavascriptUrls();
    if (!Meteor.userId()) {
        Router.go('login')
    } else{
        Meteor.subscribe('truckCardImg');
    }
});

Template.truckInformation.onRendered(function(){
    var tags = Meteor.user().profile.tags;
    var tagsLemeat = [
        {text: "Tipo de comida",
            children: [
                {id: "temaki", text: "temaki"},
                {id: "hamburger", text: "hamburger"},
                {id: "tacos", text: "tacos"},
                {id: "burritos", text: "burritos"},
                {id: "pizza", text: "pizza"},
                {id: "coxinha", text: "coxinha"},
                {id: "pastel", text: "pastel"},
                {id: "sucos", text: "sucos"},
                {id: "cerveja", text: "cerveja"},
                {id: "chopp", text: "chopp"},
                {id: "brownie", text: "brownie"},
                {id: "açaí", text: "açaí"},
                {id: "brigadeiro", text: "brigadeiro"},
                {id: "café", text: "café"},
                {id: "churrasco", text: "churrasco"},
                {id: "churros", text: "churros"},
                {id: "crepe", text: "crepe"},
                {id: "tapioca", text: "tapioca"},
                {id: "doces", text: "doces"},
                {id: "raspadinha", text: "raspadinha"},
                {id: "massas", text: "massas"},
                {id: "hotdog", text: "hotdog"},
                {id: "picolé", text: "picolé"},
                {id: "waffle", text: "waffle"},
                {id: "salada", text: "salada"},
                {id: "risoto", text: "risoto"},
                {id: "frutos do mar", text: "frutos do mar"},
                {id: "vegan", text: "vegan"},
                {id: "vegetariano", text: "vegetariano"}
            ]},
        {text: "Tipo de Comida por nacionalidade",
            children: [
                {id: "comida japonesa", text: "comida japonesa"},
                {id: "comida coreana", text: "comida coreana"},
                {id: "comida árabe", text: "comida árabe"},
                {id: "comida italiana", text: "comida italiana"},
                {id: "comida brasileira", text: "comida brasileira"},
                {id: "comida francesa", text: "comida francesa"},
                {id: "comida americana", text: "comida americana"},
                {id: "comida peruana", text: "comida peruana"},
                {id: "comida colombiana", text: "comida colombiana"},
                {id: "comida mexicana", text: "comida mexicana"},
                {id: "comida alemã", text: "comida alemã"},
                {id: "comida chinesa", text: "comida chinesa"},
                {id: "comida australiana", text: "comida australiana"},
                {id: "comida portuguesa", text: "comida portuguesa"},
                {id: "comida portuguesa", text: "comida portuguesa"},
                {id: "comida portuguesa", text: "comida portuguesa"},
        ]},
        {text: "Tipo de comida",
            children: [
                {id: "", text: ""},
                {id: "", text: ""}
            ]}
        ];
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
        return Meteor.user().profile
    }
});