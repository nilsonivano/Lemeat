if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });
}
Template.truckAgenda.onRendered(function(){
    $('#agendaDate').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'DD/MM/YYYY hh:mm A',
        timePicker24Hour: true});
    $("#example1").DataTable();

    //GoogleMaps Autocomplete
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(5.775283, -74.344883),
        new google.maps.LatLng(-35.590799, -35.069929));

    var input = document.getElementById('agendaAddress');
    var options = {
        bounds: defaultBounds
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
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
       //Geocoding the address
       var geocoder;
       geocoder = new google.maps.Geocoder();
       geocoder.geocode( { 'address': agendaAddress}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               var lat = results[0].geometry.location.lat();
               var lng = results[0].geometry.location.lng();
           } else {
               alert("Geocode was not successful for the following reason: " + status);
           }
       });

       truckAgenda.insert({
           dateStart: dateStart,
           dateEnd: dateEnd,
           address: agendaAddress,
           //lat: lat,
           //lng: lng,
           addressReference: agendaAddressReference,
           //truckId: truckId,
           addedBy: userId
       },function(err){
           if (err){
               console.log(err);
           }else{
               console.log("Sucesso!");
               $('#agendaAddress').val("");
               $('#agendaAddressReference').val("");
               $('#agendaDate').val("");
               toastr.success("Agenda inserida com sucesso");
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
       geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               console.log(results);
               map.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                   map: map,
                   position: results[0].geometry.location
               });
           } else {
               toastr.error("Nenhum endereço localizado. Inserir um endereço válido");
           }
       });
   },
   'click .eraseAgenda': function(event){
       var agendaId = event.target.id;
       truckAgenda.remove({_id:agendaId}, function(err){
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
    },
    agenda: function(){
        var user = Meteor.userId();
        return truckAgenda.find({addedBy: user})
    }
});