//Function to plot markers on a map
//Receives as a parameter a array of agendas, map and marker Image
placeMarker = function(markersArray,map,markerImage){
    moment().locale('pt-br');
    var agendaLength = markersArray.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<agendaLength; i++){
        var latNumber = Number(markersArray[i].lat);
        var lngNumber = Number(markersArray[i].lng);
        var LatLng = {lat: latNumber, lng: lngNumber};
        var agendaDay = moment(markersArray[i].dateStart).format('LL');
        var agendaTimeStart = moment(markersArray[i].dateStart).format('LT');
        var agendaTimeEnd = moment(markersArray[i].dateEnd).format('LT');
        var agendaAddress = markersArray[i].address;
        var contentString =
            '<div>' + '<b>Endereço: </b>' + agendaAddress + '<div>' +
            '<div>' + '<b>Data: </b>' + agendaDay + '<div>' +
            '<div>' + '<b>Horário: </b>' + agendaTimeStart + ' às ' + agendaTimeEnd + '<div>' ;
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

placeMarkerTruckMap = function(markersArray,map,markerImage){
    moment().locale('pt-br');
    var markers = [];
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
                var agendaStart = results.dateStart;
                var agendaEnd = results.dateEnd;
                var agendaDay = moment(agendaStart).format('L');
                var agendaTimeStart = moment(agendaStart).format('LT');
                var agendaTimeEnd = moment(agendaEnd).format('LT');
                var agendaAddress = results.address;
                var truckName = results.truckName;
                var contentString =
                    '<div">' + '<img class="rounded" style="width:100px; height:100px; margin-bottom:5px; align:center" src=' + '"' + imgUrl + '"' + '>' + '</div>' +
                    '<div>' + '<b>Nome do Truck: </b>' + truckName + '</div>' +
                    '<div>' + '<b>Endereço: </b>' + agendaAddress + '</div>' +
                    '<div>' + '<b>Data: </b>' + agendaDay + '<div>' +
                    '<div>' + '<b>Horário: </b>' + agendaTimeStart + ' às ' + agendaTimeEnd + '<div>' ;
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                var marker = new google.maps.Marker({
                    map: map,
                    position: LatLng,
                    icon: markerImage,
                    infowindow: infowindow
                });
                markers[i] = marker;
                google.maps.event.addListener(marker, 'click', function() {
                    this.infowindow.open(map, this);
                });
                var LatLngBounds = new google.maps.LatLng(LatLng);
                bounds.extend(LatLngBounds);
                map.fitBounds(bounds);
            }
        });
    }
    return markers
};

placeMarkerEvent = function(markersArray,map,markerImage){
    moment().locale('pt-br');
    var markersOld = [];
    var length = markersArray.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var latNumber = Number(markersArray[i].lat);
        var lngNumber = Number(markersArray[i].lng);
        var LatLng = {lat: latNumber, lng: lngNumber};
        var eventDay = moment(markersArray[i].dateStart).format('LL');
        var eventTimeStart = moment(markersArray[i].dateStart).format('LT');
        var eventTimeEnd = moment(markersArray[i].dateEnd).format('LT');
        var eventAddress = markersArray[i].address;
        var eventType = markersArray[i].eventType;
        var contentString =
            '<div>' + '<b>Tipo do Evento: </b>' + eventType + '<div>' +
            '<div>' + '<b>Endereço: </b>' + eventAddress + '<div>' +
            '<div>' + '<b>Data: </b>' + eventDay + '<div>' +
            '<div>' + '<b>Horário: </b>' + eventTimeStart + ' às ' + eventTimeEnd + '<div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            map: map,
            position: LatLng,
            icon: markerImage,
            infowindow: infowindow
        });
        markersOld[i] = marker;
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());
    }
    map.fitBounds(bounds);
    return markersOld
};