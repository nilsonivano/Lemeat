Template.truckProfile.onRendered(function(){
    //Activating Slider
    $('.slider').slider();
});

Template.truckProfile.helpers({
    'truckProfile': function(){
        var truckProfile = this[0].profile;
        return truckProfile
    },
    'truckImages': function(){
        var truckImages = this[1];
        console.log(truckImages);
        return truckImages
    }
});