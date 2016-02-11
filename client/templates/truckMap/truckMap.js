Template.truckMap.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    } else{
        Meteor.subscribe('truckAgenda');
    }
});

Template.truckMap.onRendered(function(){
    $('#agendaDate').daterangepicker({
        format: 'DD/MM/YYYY'
    });
    oldAgendaMarkers = [];
});

Template.truckMap.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    }
});

Template.truckMap.events({
    'click #queryAgenda': function(event){
        event.preventDefault();
        if (oldAgendaMarkers){
            for(i = 0; i < oldAgendaMarkers; i++){
                oldAgendaMarkers[i].setMap(null);
            }
        }
        var userId = Meteor.userId();
        var drp = $('#agendaDate').data('daterangepicker');
        var dateStart = drp.startDate._d;
        var dateEnd = drp.endDate._d;
        Meteor.call('queryTruckAgenda',dateStart,dateEnd, function(error,result){
            if(error){
                console.log(error)
            } else {
                var map = GoogleMaps.maps.map.instance;
                var markerImage = '/images/Lemeat_marker_40.png';
                oldAgendaMarkers = placeMarkerTruckMap(result,map,markerImage);
                }
            });
        }
});