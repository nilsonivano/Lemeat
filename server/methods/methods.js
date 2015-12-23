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
  'insertAgenda': function(dateStart, dateEnd, agendaAddress, lat, lng, agendaAddressReference, truckName, userId){
      truckAgenda.insert({
          dateStart: dateStart,
          dateEnd: dateEnd,
          address: agendaAddress,
          lat: lat,
          lng: lng,
          addressReference: agendaAddressReference,
          truckName: truckName,
          addedBy: userId
      })
  },
  'removeAgenda': function(agendaId){
      truckAgenda.remove({_id:agendaId})
  },
  'removeTruckImg': function(id){
      truckImg.remove(id)
  }
});