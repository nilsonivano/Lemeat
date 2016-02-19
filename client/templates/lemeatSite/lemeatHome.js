Template.lemeatHome.onRendered(function(){
    //Ativating Parallax
    $('.parallax').parallax();

    //Populating Map
    GoogleMaps.ready('map', function(){
        var currentTime = new Date();
        var agendaFromNow = truckAgenda.find({dateEnd: {$gte :currentTime}}, {sort: {dateStart: 1}}).fetch();
        var map = GoogleMaps.maps.map.instance;
        var markerImage = '/images/Lemeat_marker_40.png';
        placeMarkerTruckMap(agendaFromNow,map,markerImage);
        var locationMarker = "/images/location.png";
        var latNumber = Geolocation.latLng().lat;
        var lngNumber = Geolocation.latLng().lng;
        var locationLatLng = {lat: latNumber, lng: lngNumber};
        var marker = new google.maps.Marker({
            map: map,
            position: locationLatLng,
            icon: locationMarker
        });
    });

    //Searching nearby trucks
    this.autorun(function() {
        if(Geolocation.latLng()){
            var currentTime = new Date();
            var userLocation = Geolocation.latLng();
            var userLat = userLocation.lat;
            var userLng = userLocation.lng;
            var agendaList = truckAgenda.find({dateEnd: {$gte :currentTime}}, {sort: {dateStart: 1}}).fetch();
            for(i=0; i <agendaList.length; i++){
                var agendaLat = agendaList[i].lat;
                var agendaLng = agendaList[i].lng;
                var distance = getDistanceFromLatLonInKm(userLat, userLng, agendaLat, agendaLng);
                agendaList[i].userDistance = distance;
            }
            console.log(agendaList)
        }
    })
});

Template.lemeatHome.helpers({
    cardInfo: function(){
        return Meteor.users.find({},{limit: 6})
    },
    mapOptions: function() {
        if (GoogleMaps.loaded() && Geolocation.latLng()) {
            var userLocation = Geolocation.latLng();
            var lat = userLocation.lat;
            var lng = userLocation.lng;
            return {
                center: new google.maps.LatLng(lat,lng),
                zoom: 14
            };
        }
    }
});

Template.eventForm.onRendered(function(){
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            $("#eventAddress").geocomplete();
        }
    });
});

Template.eventForm.helpers({
    eventTypes: function(){
        return eventTypes
    }
});

Template.eventForm.events({
    'click #eventSubmit': function(event){
        event.preventDefault();
        var name = $('[id=name]').val();
        var email = $('[id=email]').val();
        var phone = $('[id=phone]').val();
        var eventType = $('[id=eventType]').val();
        var eventAddress = $('[id=eventAddress]').val();
        var eventCity = $('[id=eventCity]').val();
        var eventDescription = $('[id=eventDescription]').val();
        //Datas do evento
        var eventDate = $('[id=eventDate]').val();
        var eventTimeStart = $('[id=eventTimeStart]').val();
        var eventTimeEnd = $('[id=eventTimeEnd]').val();
        var eventDateStart = new Date(eventDate + " " + eventTimeStart);
        var eventDateEnd = new Date(eventDate + " " + eventTimeEnd);
        if(Router.current().params.truckId){
            var visibleToTruck = [Router.current().params.truckId];
            var visibleToAll = false
        } else{
            var visibleToAll = true
        }
        var address = eventAddress + " " + eventCity;
        //Geocoding
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                var eventAddress = results[0].formatted_address;
                var eventCity = results[0].address_components[4].long_name;
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                Meteor.call('insertEvent',eventDateStart,eventDateEnd,eventAddress,eventCity, lat, lng, name, phone,
                    email, eventType, eventDescription, visibleToAll, visibleToTruck, function(err){
                        if(err){
                            Materialize.toast('Ops, ocorreu um erro no envio', 4000, 'red')
                        } else{
                            Materialize.toast('Enviada com sucesso. Agora é só aguardar a resposta do Food Truck', 4000, 'green')
                            $('[id=name]').val("");
                            $('[id=email]').val("");
                            $('[id=phone]').val("");
                            $('[id=eventType]').val("");
                            $('[id=eventAddress]').val("");
                            $('[id=eventCity]').val("");
                            $('[id=eventDescription]').val("");
                            //Datas do evento
                            $('[id=eventDate]').val("");
                            $('[id=eventTimeStart]').val("");
                            $('[id=eventTimeEnd]').val("");
                        }
                    })
            }
        })
    },
    'blur #eventAddress': function(){
        var eventAddress = $('[id=eventAddress]').val();
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': eventAddress}, function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                var city = results[0].address_components[4].long_name;
                $('[id=eventCity]').val(city);
            }
        })
    }
});

Template.truckTags.helpers({
    allCities: function(){
        return ReactiveMethod.call("getAllCities");
    },
    allTags: function(){
        return ReactiveMethod.call("getAllTags");
    }
});