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
  'insertTruckImg': function(file){
      truckImg.insert(file)
  },
  'insertTruckImgCard': function(file){
      truckCardImg.insert(file)
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
    },
    'getAllEventCity': function(){
        var allEventCity = truckEvents.distinct("city");
        return allEventCity
    },
    'getAllTrucksTagsCitiesJson': function(){
        var allCities = Meteor.users.distinct("profile.mainCity");
        var allTags = Meteor.users.distinct("profile.tags");
        var allTrucks = Meteor.users.distinct("profile.name");
        var data = [];
        for (i=0; i<allCities.length; i++){
            if(allCities[i]){
                var city = {
                    type: "city",
                    value: allCities[i]
                };
                data.push(city)
            }
        }
        for (i=0; i<allTags.length; i++){
            if(allTags[i]){
                var tag = {
                    type: "tag",
                    value: allTags[i]
                };
                data.push(tag)
            }
        }
        for (i=0; i<allTrucks.length; i++){
            if(allTrucks[i]){
                var truck = {
                    type: "truck",
                    value: allTrucks[i]
                };
                data.push(truck)
            }
        }
        return data
    },
    'getAllTrucksTagsCitiesList': function(){
        var allCities = Meteor.users.distinct("profile.mainCity");
        var allTags = Meteor.users.distinct("profile.tags");
        var allTrucks = Meteor.users.distinct("profile.name");
        var data = allCities.concat(allTags,allTrucks);
        return data
    },
    'getTruckIdName': function(truckName){
        var search = Meteor.users.findOne({"profile.name": truckName});
        var truckId = search._id;
        console.log(truckId);
        if(truckId){
            return truckId
        } else{
            return "No truck for this name"
        }
    },
    'getValidEventsCount': function(){
        var now = new Date();
        var truckId = this.userId;
        return truckEvents.find({$or: [{visibleToTruck: {$in: [truckId]}},{visibleToAll: true}],
            dateEnd: {$gt: now}}).count()
    }
});