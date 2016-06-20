Meteor.startup(function() {
    GoogleMaps.load({
        //key: 'AIzaSyA8tZQdJMV1-v1rBWy_BEALoyfDIBhhVGk',
        libraries: 'places'  // also accepts an array if you need more than one
    });
});