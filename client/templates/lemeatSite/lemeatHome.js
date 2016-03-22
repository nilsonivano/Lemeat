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
});

Template.lemeatHome.helpers({
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
    cardInfoOrderedByDistance: function(){
        if(Geolocation.latLng()){
            var agendaDistance = new Mongo.Collection(null);
            var orderedResults = [];
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
                var dateStart = new Date(agendaList[i].dateStart);
                dateStart.setHours(0,0,0,0);
                agendaList[i].day = dateStart;
                agendaDistance.insert(agendaList[i]);
            }
            var orderedList = agendaDistance.find({}, {sort: {day: 1, userDistance:1}}).fetch();
            for (i in orderedList){
                var user = Meteor.users.find({_id: orderedList[i].addedBy},{field: {profile: 1}}).fetch();
                var userId = user[0]._id;
                var userIdInOrderedResults = orderedResults.filter(function ( obj ) {
                    return obj.addedBy === userId;
                })[0];
                if(!userIdInOrderedResults){
                    var profile = user[0].profile;
                    var orderedResultsItem = {};
                    orderedResultsItem = profile;
                    orderedResultsItem.userDistance = orderedList[i].userDistance;
                    orderedResultsItem.dateStart = orderedList[i].dateStart;
                    orderedResultsItem.dateEnd = orderedList[i].dateEnd;
                    orderedResultsItem.address = orderedList[i].address;
                    orderedResultsItem.addedBy = orderedList[i].addedBy;
                    if(currentTime >= orderedResultsItem.dateStart && currentTime <= orderedResultsItem.dateEnd){
                        orderedResultsItem.statusOpen = true
                    } else {
                        orderedResultsItem.statusOpen = false
                        }
                    orderedResults.push(orderedResultsItem);
                    }
                }
            var trucks = Meteor.users.find().fetch();
            while(orderedResults.length < 9){
                var randomTruck = Random.choice(trucks);
                var randomTruckProfile = randomTruck.profile;
                randomTruckProfile.addedBy = randomTruck._id;
                var countFound = 0;
                for(i in orderedResults){
                    if(orderedResults[i].name == randomTruckProfile.name){
                        countFound++;
                    }
                }
                if(countFound == 0 && randomTruckProfile.img){
                    orderedResults.push(randomTruckProfile);
                }
            }
            console.log(orderedResults);
            return orderedResults
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
        var eventStart = $('[id=eventDateStart]').val();
        var eventEnd = $('[id=eventDateEnd]').val();
        var eventDateStart = new Date(eventStart);
        var eventDateEnd = new Date(eventEnd);
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
                            Materialize.toast('Enviada com sucesso. Você receberá um email com confirmação do envio', 4000, 'green');
                            var html =
                                '<div>' + 'Olá ' + name + ', sua proposta foi enviada aos Food Trucks do Lemeat.' +
                                ' Pedimos agora que aguarde o contato dos Food Trucks. Abaixo você pode revisar as informações que você enviou:' + '</div>' +
                                '<div>' + '<b>Nome: </b>' + name + '</div>' +
                                '<div>' + '<b>Email: </b>' + email + '</div>' +
                                '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
                                '<div>' + '<b>Tipo da oportunidade: </b>' + eventType + '<div>' +
                                '<div>' + '<b>Endereço: </b>' + eventAddress + '<div>' +
                                '<div>' + '<b>Data de início e fim do evento: </b>' + eventDateStart + ' a ' + eventDateEnd + '<div>' +
                                '<div>' + '<b>Descrição da Oportunidade: </b>' + eventDescription + '<div>' +
                                '<div>' + 'Obrigado por utilizar o Lemeat (www.lemeat.com)' + '</div>';

                            Meteor.call('sendEmail',
                                email,
                                'contato@lemeat.com',
                                'Sua proposta foi enviada com sucesso para os Food Trucks do Lemeat',
                                html);

                            $('[id=name]').val("");
                            $('[id=email]').val("");
                            $('[id=phone]').val("");
                            $('[id=eventType]').val("");
                            $('[id=eventAddress]').val("");
                            $('[id=eventCity]').val("");
                            $('[id=eventDescription]').val("");
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