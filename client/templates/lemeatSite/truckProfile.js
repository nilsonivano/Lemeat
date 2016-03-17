Template.truckProfile.onRendered(function(){
    GoogleMaps.ready('map', function(map){
        var truckId = Router.current().params.truckId;
        var agendas = truckAgenda.find({addedBy: truckId}).fetch();
        var map = GoogleMaps.maps.map.instance;
        var markerImage = '/images/Lemeat_marker_40.png';
        placeMarker(agendas,map,markerImage);
    });
    $('.truckFullDescription').readmore({
        speed: 200,
        moreLink: '<a href="#">Mais</a>',
        lessLink: '<a href="#">Menos</a>',
        collapsedHeight: 150
    });
    $('.truckMenuDescription').readmore({
        speed: 200,
        moreLink: '<a href="#">Mais</a>',
        lessLink: '<a href="#">Menos</a>',
        collapsedHeight: 150
    });
});

Template.truckProfile.onCreated(function(){
});

Template.truckProfile.helpers({
    'truckProfile': function(){
        var truckId = Router.current().params.truckId;
        var truckProfile = Meteor.users.find({_id: truckId}).fetch();
        return truckProfile[0].profile
    },
    'truckImages': function(){
        var truckId = Router.current().params.truckId;
        var truckImages = truckImg.find({addedBy: truckId}).fetch();
        return truckImages
    },
    'truckAgenda': function(){
        var currentTime = new Date();
        var truckId = Router.current().params.truckId;
        var agenda = truckAgenda.find({dateEnd: {$gte :currentTime},addedBy: truckId }, {sort: {dateStart: 1}}).fetch();
        return agenda
    },
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    },
    'openStatus': function(){
        var truckId = Router.current().params.truckId;
        var currentTime = new Date();
        var agenda = truckAgenda.find({dateEnd: {$gte :currentTime}, dateStart: {$lte: currentTime},addedBy: truckId }, {sort: {dateStart: 1}}).fetch()
        if(agenda.length > 0){
            return true
        }else{
            return false
        }
    }
});

UI.registerHelper('breaklines', function(text, options) {
    text = s.escapeHTML(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
    return new Spacebars.SafeString(text);
});

