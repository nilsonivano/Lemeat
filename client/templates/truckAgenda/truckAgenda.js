if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });
}
Template.truckAgenda.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    } else{
        Meteor.subscribe('truckAgendaAll');
    }
});

Template.truckAgenda.onRendered(function(){
    $('#agendaDate').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'DD/MM/YYYY hh:mm A',
        timePicker24Hour: true});
    $("#example1").DataTable();

    //GoogleMaps Autocomplete
    //var defaultBounds = new google.maps.LatLngBounds(
    //    new google.maps.LatLng(5.775283, -74.344883),
    //    new google.maps.LatLng(-35.590799, -35.069929));
    //
    //var input = document.getElementById('agendaAddress');
    //var options = {
    //    bounds: defaultBounds
    //};
    //autocomplete = new google.maps.places.Autocomplete(input, options);

});

Template.agendaMap.onRendered(function(){
    //Colocando os Markers
    var map = GoogleMaps.maps.mapAgenda.instance;
    var user = Meteor.userId();
    var agendas = truckAgenda.find({addedBy:user}).fetch();
    var markerImage = '/images/markerFt.png';
    placeMarker(agendas,map,markerImage);
});

Template.truckAgenda.events({
   'click #saveAgenda': function(event){
       var agendaAddress = $('#agendaAddress').val();
       var agendaAddressReference = $('#agendaAddressReference').val();
       var agendaDate = $('#agendaDate').val();
       var userId = Meteor.userId();
       var drp = $('#agendaDate').data('daterangepicker');
       var dateStart = drp.startDate._d;
       var dateEnd = drp.endDate._d;
       var truckName = Meteor.user().profile.name;
       //Geocoding the address
       var geocoder;
       geocoder = new google.maps.Geocoder();
       geocoder.geocode( { 'address': agendaAddress}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               var lat = results[0].geometry.location.lat();
               var lng = results[0].geometry.location.lng();
               console.log(results);
               Meteor.call('insertAgenda',dateStart, dateEnd, agendaAddress, lat, lng,
                   agendaAddressReference, truckName, userId, function(err){
                   if (err){
                       console.log(err);
                       toastr.error("Algo de errado aconteceu")
                   }else{
                       $('#agendaAddress').val("");
                       $('#agendaAddressReference').val("");
                       $('#agendaDate').val("");
                       toastr.success("Agenda inserida com sucesso");
                   }
               });
           } else {
               alert("Endereço não encontrado: " + status);
           }
       });


   },
   'change #agendaAddress':function(event){
       var agendaAddress = $('#agendaAddress').val();
       //Geocoding
       var geocoder;
       geocoder = new google.maps.Geocoder();
       var address = agendaAddress;
       var map = GoogleMaps.maps.map.instance;
       var markerImage = '/images/markerFt.png';
       geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               console.log(results);
               map.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                   map: map,
                   position: results[0].geometry.location,
                   icon: markerImage
               });
           } else {
               toastr.error("Nenhum endereço localizado. Inserir um endereço válido");
           }
       });
   },
   'click .eraseAgenda': function(event){
       var agendaId = event.target.id;
       Meteor.call('removeAgenda', agendaId, function(err){
           if(err){
               console.log(err.reason)
           } else{
               toastr.success("Agenda apagada com sucesso");
           }
       });
   }
});

Template.truckAgenda.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    }
});

Template.agendaTable.helpers({
    agenda: function(){
        var user = Meteor.userId();
        return truckAgenda.find({addedBy: user})
    }
});

Template.agendaMap.helpers({
    mapOptionsAgenda: function() {
        if (GoogleMaps.loaded()) {
            var user = Meteor.userId();
            var results = truckAgenda.find({addedBy: user}).fetch();
            if(results.length > 0){
                lat = results[0].lat;
                lng = results[0].lng;
                return {
                    center: new google.maps.LatLng(lat,lng),
                    zoom: 12
                }
            } else{
                return {
                    center: new google.maps.LatLng(-37.8136, 144.9631),
                    zoom: 4
                };
            }
        }
    }
});

placeMarker = function(markersArray,map,markerImage){
    var agendaLength = markersArray.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<agendaLength; i++){
        var latNumber = Number(markersArray[i].lat);
        var lngNumber = Number(markersArray[i].lng);
        var LatLng = {lat: latNumber, lng: lngNumber};
        var agendaStart = markersArray[i].dateStart.toUTCString();
        var agendaEnd = markersArray[i].dateEnd.toUTCString();
        var agendaAddress = markersArray[i].address;
        var contentString = '<div>' + '<b>Endereço: </b>' + agendaAddress + '<div>' +
            '<div>' + '<b>Início da agenda: </b>'+ agendaStart + '<div>' +
            '<div>' + '<b>Fim da agenda: </b>' + agendaEnd + '<div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            map: map,
            position: LatLng,
            icon: markerImage,
            infowindow: infowindow
        });
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());
    }
    map.fitBounds(bounds);
};