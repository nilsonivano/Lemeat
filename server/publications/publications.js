Meteor.publish('truckAgendaAll', function(){
    return truckAgenda.find()
});

Meteor.publish('siteTruckProfileAll', function(){
    return Meteor.users.find({},{fields: {profile: 1}})
});

Meteor.publish('truckEventsAll', function(){
    return truckEvents.find()
})

Meteor.publish('truckImg', function(){
    var currentUserId = this.userId;
    return truckImg.find({addedBy: currentUserId})
});

Meteor.publish('truckCardImg', function(){
    var currentUserId = this.userId;
    return truckImg.find({addedBy: currentUserId})
});

Meteor.publish('truckEventsAll', function(){
    return truckEvents.find()
});

Meteor.publish('siteTruckProfileImg', function(truckId){
    var truckIdImg = truckId;
    return truckImg.find({addedBy: truckIdImg})
});

Meteor.publish('truckProfile', function(truckId){
    return Meteor.users.find({_id: truckId},{fields: {profile: 1}})
});

Meteor.publish('truckAgenda', function(truckId){
    return truckAgenda.find({addedBy: truckId})
})

Meteor.publish('tagSearchTruck', function(tags) {
    return Meteor.users.find(
            {"profile.tags": {$in: [tags]}},
            {fields: {profile: 1}})
});

Meteor.publish('citySearchTruck', function(mainCity) {
    return Meteor.users.find(
            {"profile.mainCity": {$in: [mainCity]}},
            {fields: {profile: 1}})
});

Meteor.publish('cityTagsSearchTruck', function(tags, mainCity) {
    return Meteor.users.find(
            {"profile.mainCity": mainCity, "profile.tags": {$in: [tags]}},
            {fields: {profile: 1}})
});

Meteor.publish('truckAgendaFromNow',function(){
    var currentTime = new Date();
    var agenda = truckAgenda.find({dateEnd: {$gte :currentTime}}, {sort: {dateStart: 1}}).fetch();
    return agenda
})