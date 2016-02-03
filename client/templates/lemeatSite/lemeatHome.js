Template.lemeatHome.onRendered(function(){
    //Ativating Parallax
    $('.parallax').parallax();

    //Populating Map
    GoogleMaps.ready('map', function(map){
        var currentTime = new Date();
        var agendaFromNow = truckAgenda.find({dateEnd: {$gte :currentTime}}, {sort: {dateStart: 1}}).fetch();
        var map = GoogleMaps.maps.map.instance;
        var markerImage = '/images/Lemeat_marker_40.png';
        placeMarkerTruckMap(agendaFromNow,map,markerImage);
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
    },
    allCities: function(){
        Meteor.call('getAllCities', function(err,results){
            if(err){
                console.log(err)
            }else{
                console.log(results);
                return results
            }
        })
    },
    allTags: function(){
        Meteor.call('getAllTags', function(err,results){
            if(err){
                console.log(err)
            }else{
                console.log(results);
                return results
            }
        })
    }
});

Template.eventForm.onRendered(function(){
});

Template.eventForm.helpers({
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
        console.log(email,phone);
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
                    email, eventType, visibleToAll, visibleToTruck, function(err){
                        if(err){
                            console.log(err)
                        } else{
                            console.log("sucesso no envio!")
                        }
                    })
            }
        })
    },
    'change #eventAddress': function(){
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

