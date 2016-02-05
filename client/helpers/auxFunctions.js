moment.defineLocale('pt-br', {
    months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
    weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
    weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY [às] LT',
        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : '%s atrás',
        s : 'segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    ordinal : '%dº'
});

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

placeMarkerEvent = function(markersArray,map,markerImage){
    moment().locale('pt-br');
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
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());
    }
    map.fitBounds(bounds);
};