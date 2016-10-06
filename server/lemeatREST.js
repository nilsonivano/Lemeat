//Api config
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

Api.addRoute('truckAgenda',{
    get: {
        authRequired: false,
        action: function () {
            //Get Agendas
            var currentTime = new Date();
            var agenda = truckAgenda.find({dateEnd: {$gte: currentTime}}, {sort: {dateStart: 1}}).fetch();
            return agenda
        }
    }
});

Api.addCollection(Meteor.users, {
    excludedEndpoints: ['getAll', 'put'],
    routeOptions: {
        authRequired: false
    },
    endpoints: {
        post: {
            authRequired: false
        },
        delete: {
            roleRequired: 'admin'
        }
    }
});

//Trucks Rest lat={lat}&lng={lng}&o={page}&l={pageSize}
Api.addRoute('truckList', {
    get: {
        authRequired: false,
        action: function () {
            var query = this.queryParams;
            var userLat = query.lat;
            var userLng = query.lng;
            var currentTime = new Date();
            var results = Meteor.users.find({}, {fields: {'profile': 1}}).fetch();
            var searchResultsDb = new Mongo.Collection(null);
            for (i in results) {
                var agenda = truckAgenda.find({
                    addedBy: results[i]._id,
                    dateEnd: {$gte: currentTime}
                }, {sort: {dateStart: 1}}).fetch();
                if (agenda.length > 0) {
                    var agendaLat = agenda[0].lat;
                    var agendaLng = agenda[0].lng;
                    var distance = getDistanceFromLatLonInKm(userLat, userLng, agendaLat, agendaLng);
                    results[i].haveAgenda = true;
                    results[i].userDistance = distance;
                    results[i].dateStart = agenda[0].dateStart;
                    results[i].dateEnd = agenda[0].dateEnd;
                    var dateStart = new Date(results[i].dateStart);
                    dateStart.setHours(0, 0, 0, 0);
                    results[i].day = dateStart;
                    if (currentTime >= results[i].dateStart && currentTime <= results[i].dateEnd) {
                        results[i].statusOpen = true
                    } else {
                        results[i].statusOpen = false
                    }
                    searchResultsDb.insert(results[i]);
                } else {
                    results[i].haveAgenda = false;
                    searchResultsDb.insert(results[i]);
                }
            }
            var search = searchResultsDb.find({}, {sort: {haveAgenda: -1, day: 1, userDistance: 1, name: 1}}).fetch()
            for (i in search) {
                search[i].profile.img = "http://localhost:3000" + search[i].profile.img;
            }
            return search
        }
    }
});

//Truck detailed information /truckInfo/{id}
Api.addRoute('truckInfo', {
    get: {
        authRequired: false,
        action: function () {
            var query = this.queryParams;
            var id = query.id;
            var results = Meteor.users.find({_id: id}, {fields: {'profile': 1}}).fetch();
            //Get Agendas
            var currentTime = new Date();
            var agenda = truckAgenda.find({addedBy: id, dateEnd: {$gte: currentTime}}, {sort: {dateStart: 1}}).fetch();
            results[0].agenda = agenda;
            //Get Images
            var images = truckImg.find({addedBy: id}).fetch();
            results[0].images = images;
            return results
        }
    }
});
