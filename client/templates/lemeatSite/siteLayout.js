Template.siteLayout.onRendered(function(){
    //Ativating lateral menu
    $('.button-collapse').sideNav();
    //Activating autocomplete
    Meteor.call('getAllTrucksTagsCitiesList', function(err, results){
        if(err){
            console.log(err)
        } else{
            Meteor.typeahead($('#lemeatSearch'), results)
        }
    });
});

Template.siteLayout.events({
    'blur #lemeatSearch': function(){
        Meteor.call('getAllTrucksTagsCitiesJson', function(err, results){
            if(err){
                console.log(err)
            } else{
                var search = $('#lemeatSearch').val();
                var searchType = "";
                var types = results;
                console.log(types);
                for(i=0; i< types.length; i++){
                    if(types[i].value == search){
                        searchType = types[i].type;
                        console.log(searchType);
                        break
                    }
                }
                console.log(searchType);
                switch (searchType){
                    case "tag":
                        Router.go("/tags/"+ search);
                        break;
                    case "truck":
                        Meteor.call('getTruckIdName',search, function(err,results){
                            if(err){
                                console.log(err)
                            } else{
                                Router.go("/truckProfile/" + results)
                            }
                        })
                        break;
                    case "city":
                        Router.go("/city/"+ search);
                        break
                }
                $('#lemeatSearch').val("");
            }

        })
    }
})