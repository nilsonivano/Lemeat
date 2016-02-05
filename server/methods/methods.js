Meteor.methods({
  'userRegister': function(email,password,truckName) {
      Accounts.createUser({
          email: email,
          password: password,
          profile: {
              name: truckName
          }
      });
  },
  'queryTruckAgenda': function(dateStart,dateEnd) {
      return truckAgenda.find({dateStart:{$gt: dateStart, $lt:dateEnd}}).fetch()
  },
  'queryTruckMarkerInfo' : function(markerInfo) {
      var userId = markerInfo.addedBy;
      markerInfo.userProfile = Meteor.users.find({_id: userId},{fields: {'profile': 1}}).fetch();
      return markerInfo;
  },
  'insertAgenda': function(dateStart, dateEnd, agendaAddress, lat, lng, agendaAddressReference, truckName, userId, city){
      truckAgenda.insert({
          dateStart: dateStart,
          dateEnd: dateEnd,
          address: agendaAddress,
          lat: lat,
          lng: lng,
          addressReference: agendaAddressReference,
          truckName: truckName,
          addedBy: userId,
          city: city
      })
  },
  'removeAgenda': function(agendaId){
      truckAgenda.remove({_id:agendaId})
  },
  'removeTruckImg': function(id){
      truckImg.remove(id)
  },
  'insertEvent': function(dateStart, dateEnd, eventAddress, city, lat, lng, name, phone,
                          email, eventType, eventDescription, visibleToAll, visibleToTruck){
      truckEvents.insert({
          dateStart: dateStart,
          dateEnd: dateEnd,
          eventType: eventType,
          eventDescription: eventDescription,
          address: eventAddress,
          city: city,
          lat: lat,
          lng: lng,
          addedBy: name,
          contacts:{
              phone: phone,
              email: email
          },
          visibleToAll: visibleToAll,
          visibleToTruck: visibleToTruck
      })
  },
   'getAllCities': function(){
       var allCities = Meteor.users.distinct("profile.mainCity");
       return allCities
   },
    'getAllTags': function(){
        var allTags = Meteor.users.distinct("profile.tags");
        return allTags
    }
});