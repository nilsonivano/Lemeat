Template.truckEvents.onCreated(function(){
    GoogleMaps.ready('map', function (){
        Session.set('eventsQuery', "");
        var map = GoogleMaps.maps.map.instance;
        var markerImage = '/images/Lemeat_marker_40.png';
        var user = Meteor.userId();
        var now = new Date();
        var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],
            dateEnd: {$gt: now}}).fetch();
        oldEventMarkers = placeMarkerEvent(events, map, markerImage);
    })
});

Template.truckEvents.onRendered(function(){
    $('#eventDate').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('#eventDate').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    });

    $('#eventDate').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    $('#eventType').select2({
        data: eventTypes
    });
    $('#eventCity').select2(
    );
});

Template.truckEvents.helpers({
  events: function () {
      if(Session.get('eventsQuery')){
          var events = Session.get('eventsQuery');
          return events
      } else{
          var user = Meteor.userId();
          return truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}]},
              {sort: {visibleToAll: 1}}).fetch()
      }
  },
  mapOptions: function() {
      if (GoogleMaps.loaded()) {
          return {
              center: new google.maps.LatLng(-37.8136, 144.9631),
              zoom: 16
          };
      }
  },
  eventCity: function(){
      return ReactiveMethod.call('getAllEventCity')
  }
});

Template.truckEvents.events({
    'click #queryEvent': function(event){
        event.preventDefault();
        var map = GoogleMaps.maps.map.instance;
        for (i=0; i < oldEventMarkers.length; i++){
            oldEventMarkers[i].setMap(null);
        }
        var date = $('#eventDate').val();
        if(date){
            var drp = $('#eventDate').data('daterangepicker');
            var dateStart = drp.startDate._d;
            var dateEnd = drp.endDate._d;
        } else{
            var dateStart = "";
            var dateEnd = "";
        }
        var eventType = $('#eventType').val();
        var eventCity = $('#eventCity').val();
        console.log(dateStart, dateEnd, eventType, eventCity);
        var user = Meteor.userId();
        if(dateStart && dateEnd && eventType && eventCity){
            console.log("tudo");
            var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],
                dateStart: {$gte: dateStart}, dateEnd: {$lte: dateEnd},//Busca por data
                eventType: {$in: eventType},
                city: {$in: eventCity}}).fetch();//Busca por Tipo de evento
        }
        else if(dateStart && dateEnd && eventType){
            console.log("busca por data e tipo");
            var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],
                dateStart: {$gte: dateStart}, dateEnd: {$lte: dateEnd},//Busca por data
                eventType: {$in: eventType}}).fetch();//Busca por Tipo de evento
        }
        else if(eventCity && eventType){
            console.log("cidade e tipo");
            var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],
                eventType: {$in: eventType},//Busca por Tipo de evento
                city: {$in: eventCity}}).fetch();//Busca por cidade
        }
        else if(dateStart && dateEnd){
            console.log("busca por data");
            var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],//Busca por visibility e truck
                dateStart: {$gte: dateStart}, dateEnd: {$lte: dateEnd}}).fetch();//Busca por data
        } else if(eventType){
            console.log("busca por tipo");
            var events = truckEvents.find({$or: [{visibleToTruck: {$in: [user]}},{visibleToAll: true}],
                eventType: {$in: eventType}}).fetch(); //Busca por Tipo de evento
        } else if(eventCity) {
            console.log("busca por cidade");
            var events = truckEvents.find({
                $or: [{visibleToTruck: {$in: [user]}}, {visibleToAll: true}],
                city: {$in: eventCity}
            }).fetch(); //Busca por Cidade
        }
        Session.set('eventsQuery',events);
        var markerImage = '/images/Lemeat_marker_40.png';
        oldEventMarkers = placeMarkerEvent(events, map, markerImage)



    }
});