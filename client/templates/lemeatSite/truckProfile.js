Template.truckProfile.onRendered(function(){
    GoogleMaps.ready('map', function(map){
        var agendas = truckAgenda.find({addedBy: truckId}).fetch();
        var map = GoogleMaps.maps.map.instance;
        var markerImage = '/images/Lemeat_marker_40.png';
        placeMarker(agendas,map,markerImage);
    })
});

Template.truckProfile.onCreated(function(){
});

Template.truckProfile.helpers({
    'truckProfile': function(){
        var truckProfile = Meteor.users.find().fetch();
        return truckProfile[0].profile
    },
    'truckImages': function(){
        var truckImages = truckImg.find().fetch();
        return truckImages
    },
    'truckAgenda': function(){
        var currentTime = new Date();
        var agenda = truckAgenda.find({dateEnd: {$gte :currentTime}}, {sort: {dateStart: 1}}).fetch();
        return agenda
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

UI.registerHelper('breaklines', function(text, options) {
    text = s.escapeHTML(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
    return new Spacebars.SafeString(text);
});

