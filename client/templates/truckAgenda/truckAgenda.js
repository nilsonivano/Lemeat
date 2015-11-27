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
    //var defaultBounds = new google.maps.LatLngBounds(
    //    new google.maps.LatLng(5.775283, -74.344883),
    //    new google.maps.LatLng(-35.590799, -35.069929));
    //
    //var input = document.getElementById('agendaAddress');
    //var options = {
    //    bounds: defaultBounds
    //};
    //autocomplete = new google.maps.places.Autocomplete(input, options);
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';
    //var
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    //Colocando o Marker
    var map = GoogleMaps.maps.mapAgenda.instance;
    var user = Meteor.userId();
    var agendas = truckAgenda.find({addedBy:user}).fetch();
    var agendaLength = agendas.length;
    var markerImage = '/images/markerFt.png';
    for(i=0; i<agendaLength; i++){
        latNumber = Number(agendas[i].lat);
        lngNumber = Number(agendas[i].lng);
        agendaDate = agendas[i].dateStart.toUTCString();
        var LatLng = {lat: latNumber, lng: lngNumber};
        var marker = new google.maps.Marker({
            map: map,
            position: LatLng,
            icon: markerImage
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }
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
               truckAgenda.insert({
                   dateStart: dateStart,
                   dateEnd: dateEnd,
                   address: agendaAddress,
                   lat: lat,
                   lng: lng,
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
    mapOptionsAgenda: function() {
        if (GoogleMaps.loaded()) {
            var user = Meteor.userId();
            var results = truckAgenda.find({addedBy: user}).fetch();
            if(results.length>0){
                lat = results[0].lat;
                lng = results[0].lng;
                console.log(results,lat,lng);
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
    },
    agenda: function(){
        var user = Meteor.userId();
        return truckAgenda.find({addedBy: user})
    }
});