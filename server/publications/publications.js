Meteor.publish('truckAgenda', function(){
    return truckAgenda.find()
});

Meteor.publish('truckImg', function(){
    var currentUserId = this.userId;
    return truckImg.find({addedBy: currentUserId})
});

Meteor.publish('truckCardImg', function(){
    var currentUserId = this.userId;
    return truckImg.find({addedBy: currentUserId})
});

Meteor.publish('truckEvents', function(){
    return truckEvents.find()
});

Meteor.publish('truckProfile', function(){
    return Meteor.users.find({},{fields: {profile: 1}});
});

Meteor.publish('siteTruckProfileImg', function(truckId){
    var truckIdImg = truckId;
    return truckImg.find({addedBy: truckIdImg})
});