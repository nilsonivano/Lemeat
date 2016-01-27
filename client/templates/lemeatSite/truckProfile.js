Template.truckProfile.onRendered(function(){
    //Activating Slider
    //Meteor.setTimeout(function(
    //    ){
    //    $('.slider').slider();
    //},500);
});

Template.truckProfile.onCreated(function(){
    truckId = Router.current().params.truckId;
    this.subscribe('siteTruckProfileImg',truckId);
    this.subscribe('truckProfile', truckId);
});

Template.truckProfile.helpers({
    'truckProfile': function(){
        truckId = Router.current().params.truckId;
        var truckProfile = Meteor.users.find({_id: truckId}).fetch();
        return truckProfile[0].profile
    },
    'truckImages': function(){
        truckId = Router.current().params.truckId;
        var truckImages = truckImg.find({addedBy: truckId}).fetch();
        return truckImages
    }
});