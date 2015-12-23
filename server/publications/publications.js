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