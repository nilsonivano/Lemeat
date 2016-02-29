Template.lemeatSearch.helpers({
    searchResults: function(){
        var searchResults = Meteor.users.find().fetch();
        var results = [];
        for (i in searchResults){
            var truck = {};
            truck.name = searchResults[i].profile.name;
            truck.img = searchResults[i].profile.img;
            truck.speciality = searchResults[i].profile.speciality;
            truck.description = searchResults[i].profile.description;
            truck.addedBy = searchResults[i]._id;
            results.push(truck);
        }
        if(Geolocation.latLng()){
            var currentTime = new Date();
            var userLocation = Geolocation.latLng();
            var userLat = userLocation.lat;
            var userLng = userLocation.lng;
            searchResultsDb = new Mongo.Collection(null);
            for(i in results){
                var agenda = truckAgenda.find({addedBy: results[i].addedBy, dateEnd: {$gte: currentTime}}, {sort: {dateStart: 1}}).fetch();
                if(agenda.length > 0){
                    var agendaLat = agenda[0].lat;
                    var agendaLng = agenda[0].lng;
                    var distance = getDistanceFromLatLonInKm(userLat, userLng, agendaLat, agendaLng);
                    results[i].haveAgenda = true;
                    results[i].userDistance = distance;
                    results[i].dateStart = agenda[0].dateStart;
                    results[i].dateEnd = agenda[0].dateEnd;
                    var dateStart = new Date(results[i].dateStart);
                    dateStart.setHours(0,0,0,0);
                    results[i].day = dateStart;
                    if(currentTime >= results[i].dateStart && currentTime <= results[i].dateEnd){
                        results[i].statusOpen = true
                    } else {
                        results[i].statusOpen = false
                    }
                    searchResultsDb.insert(results[i]);
                } else{
                    results[i].haveAgenda = false;
                    searchResultsDb.insert(results[i]);
                }
            }
        return searchResultsDb.find({},{sort: {haveAgenda: -1, day:1, userDistance: 1, name: 1}}).fetch()
        }
    },
    search: function(){
        tags = Router.current().params.tags;
        city = Router.current().params.mainCity;
        if(tags){
            return tags
        } else {
            return city
        }
    }
});


