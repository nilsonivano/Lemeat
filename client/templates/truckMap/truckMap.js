Meteor.subscribe('truckAgenda');

Template.truckMap.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    }
});

Template.truckMap.onRendered(function(){
    $('#agendaDate').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'DD/MM/YYYY hh:mm A',
        timePicker24Hour: true});
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
        var userId = Meteor.userId();
        var drp = $('#agendaDate').data('daterangepicker');
        var dateStart = drp.startDate._d;
        var dateEnd = drp.endDate._d;
        Meteor.call('queryTruckAgenda',dateStart,dateEnd, function(error,result){
            if(error){
                console.log(error)
            } else {
                var map = GoogleMaps.maps.map.instance;
                var markerImage = '/images/markerFt.png';
                placeMarkerTruckMap(result,map,markerImage);
                //$('#agendaDate').data('daterangepicker').val("");
            }
            });
        }
});

placeMarkerTruckMap = function(markersArray,map,markerImage){
    var agendaLength = markersArray.length;
    var bounds = new google.maps.LatLngBounds();
    var truckImgUrl = [];
    for(i = 0; i<agendaLength; i++){
        var markerInfo = markersArray[i];
        Meteor.call('queryTruckMarkerInfo',markerInfo,function(err,results){
            if(err){
                console.log(err)
            } else{
                var imgUrl = results.userProfile[0].profile.img;
                var latNumber = Number(results.lat);
                var lngNumber = Number(results.lng);
                var LatLng = {lat: latNumber, lng: lngNumber};
                var agendaStart = results.dateStart.toUTCString();
                var agendaEnd = results.dateEnd.toUTCString();
                var agendaAddress = results.address;
                var truckName = results.truckName;
                var contentString =
                    '<div>' + '<img style="width:100px; height:100px; margin-bottom:5px; align:center" src=' + '"' + imgUrl + '"' + '>' + '</div>' +
                    '<div>' + '<b>Nome do Truck: </b>' + truckName + '</div>' +
                    '<div>' + '<b>Endereço: </b>' + agendaAddress + '</div>' +
                    '<div>' + '<b>Início da agenda: </b>'+ agendaStart + '</div>' +
                    '<div>' + '<b>Fim da agenda: </b>' + agendaEnd + '</div>';
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
                var LatLngBounds = new google.maps.LatLng(LatLng);
                bounds.extend(LatLngBounds);
                map.fitBounds(bounds);
            }
        });
    }
};