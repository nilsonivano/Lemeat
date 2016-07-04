Template.truckAgenda.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    }
});

Template.truckAgenda.onRendered(function(){
    $('#agendaDate').daterangepicker({
        singleDatePicker: true,
        format: 'MM/DD/YYYY'});
    $("#agendaTable").DataTable();
    Tracker.autorun(function(){
        if (GoogleMaps.loaded()) {
            $("#agendaAddress").geocomplete();
        }
    });
});

Template.agendaMap.onRendered(function(){
    //Colocando os Markers
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            var map = GoogleMaps.maps.mapAgenda.instance;
            var user = Meteor.userId();
            var agendas = truckAgenda.find({addedBy:user}).fetch();
            var markerImage = '/images/Lemeat_marker_40.png';
            placeMarker(agendas,map,markerImage);
        }
    });
});

Template.truckAgenda.events({
   'click #saveAgenda': function(event){
       var agendaAddress = $('#agendaAddress').val();
       var agendaAddressReference = $('#agendaAddressReference').val();
       var dateStart = $('#agendaDate').val();
       var timeStart = $('#timeStart').val();
       var timeEnd = $('#timeEnd').val();
       var userId = Meteor.userId();
       if(agendaAddress && dateStart && timeStart && timeEnd){
           var AgendaDateStart = new Date(dateStart + " " + timeStart);
           var AgendaDateEnd = new Date(dateStart + " " + timeEnd);
           var truckName = Meteor.user().profile.name;
           //Geocoding the address
           var geocoder;
           geocoder = new google.maps.Geocoder();
           geocoder.geocode( { 'address': agendaAddress}, function(results, status) {
               if (status == google.maps.GeocoderStatus.OK) {
                   var eventAddress = results[0].formatted_address;
                   var eventCity = results[0].address_components[4].long_name;
                   var lat = results[0].geometry.location.lat();
                   var lng = results[0].geometry.location.lng();
                   Meteor.call('insertAgenda',AgendaDateStart, AgendaDateEnd, eventAddress, lat, lng,
                       agendaAddressReference, truckName, userId, eventCity, function(err){
                           if (err){
                               console.log(err);
                               toastr.error("Algo de errado aconteceu")
                           }else{
                               $('#agendaAddress').val("");
                               $('#agendaAddressReference').val("");
                               $('#agendaDate').val("");
                               $('#timeStart').val("");
                               $('#timeEnd').val("");
                               toastr.success("Agenda inserida com sucesso");
                           }
                       });
               } else {
                   alert("Endereço não encontrado: " + status);
               }
           });
       } else{
           toastr.error("Completar todos os dados da agenda")
       }
   },
   'blur #agendaAddress':function(event){
       var agendaAddress = $('#agendaAddress').val();
       console.log(agendaAddress);
       //Geocoding
       var geocoder;
       geocoder = new google.maps.Geocoder();
       var address = agendaAddress;
       var map = GoogleMaps.maps.map.instance;
       var markerImage = '/images/Lemeat_marker_40.png';
       geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
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
        $("#example1").DataTable();
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