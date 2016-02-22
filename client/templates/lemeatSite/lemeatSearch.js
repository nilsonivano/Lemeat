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
            for(i in results){
                var agenda = truckAgenda.find({addedBy: results[i].addedBy}, {sort: {dateStart: 1}}).fetch();
                if(agenda.length > 0){
                    var agendaLat = agenda[0].lat;
                    var agendaLng = agenda[0].lng;
                    var distance = getDistanceFromLatLonInKm(userLat, userLng, agendaLat, agendaLng);
                    results[i].userDistance = distance;
                    results[i].dateStart = agenda[0].dateStart
                }
            }
            if(results){
                results.sort(function(a, b){
                    return a.userDistance < b.userDistance;
                });
            }
        }
        return results
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


