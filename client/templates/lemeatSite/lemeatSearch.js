Template.lemeatSearch.helpers({
    searchResults: function(){
        return Meteor.users.find().fetch()
    }
});
