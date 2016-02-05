Template.truckEvents.onRendered(function(){
    $('#eventDate').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'DD/MM/YYYY hh:mm A',
        timePicker24Hour: true});
    var user = Meteor.userId();
    var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}]}).fetch();
    if(GoogleMaps.loaded()){
        var markerImage = '/images/Lemeat_marker_40.png';
        var map = GoogleMaps.maps.map.instance;
        placeMarkerEvent(events, map, markerImage)
    }
});

Template.truckEvents.helpers({
  events: function () {
      var user = Meteor.userId();
      return truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}]}).fetch()
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
