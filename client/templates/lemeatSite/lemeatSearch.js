Template.lemeatSearch.helpers({
    searchResults: function(){
        return Meteor.users.find().fetch()
    },
    search: function(){
        tags = Router.current().params.tags;
        city = Router.current().params.mainCity;
        if(tags){
            return tags
        } else {
            return city
        }
    }
});


