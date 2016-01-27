Meteor.subscribe('truckProfileAll');

Template.lemeatHome.onRendered(function(){
    //Ativatingparallax
    $('.parallax').parallax();

    //Populating map
    var dateStart = new Date(2015,11,01);
    var dateEnd = new Date(2016,01,15);
    Meteor.call('queryTruckAgenda',dateStart,dateEnd, function(error,result){
        if(error){
            console.log(error)
        } else {
            var map = GoogleMaps.maps.map.instance;
            var markerImage = '/images/markerFt.png';
            placeMarkerTruckMap(result,map,markerImage);
        }
    });
});

Template.lemeatHome.helpers({
    cardInfo: function(){
        return Meteor.users.find({},{limit: 6})
    },
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    }
});
