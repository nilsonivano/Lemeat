// Website routing

Router.route('/home', {
    name: 'lemeatHome',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    subscriptions: function() {
        return (Meteor.subscribe('siteTruckProfileAll'),
                Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/truckProfile/:truckId', {
    name: 'truckProfile',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    subscriptions: function() {
        truckId = Router.current().params.truckId;
        return (Meteor.subscribe('siteTruckProfileImg',truckId),
                Meteor.subscribe('truckProfile', truckId),
                Meteor.subscribe('truckAgenda',truckId)
        );
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/tags/:tags', {
    name: 'lemeatSearchTags',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    subscriptions: function() {
        tags = Router.current().params.tags;
        return Meteor.subscribe('tagSearchTruck',tags);
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/city/:mainCity', {
    name: 'lemeatSearchCity',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    subscriptions: function() {
        mainCity = Router.current().params.mainCity;
        return Meteor.subscribe('citySearchTruck',mainCity);
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/city/:mainCity/tags/:tags', {
    name: 'lemeatSearchCityTags',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    subscriptions: function() {
        mainCity = Router.current().params.mainCity;
        tags = Router.current().params.tags;
        return Meteor.subscribe('cityTagsSearchTruck',tags,mainCity);
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

// App for truckers routing

Router.route('/login', {
    name: 'login',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/adminLTE.js'
        ]
    }
});

Router.route('/register', {
    name: 'register',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/aadminLTE.js'
        ]
    }
});

Router.route('/forgotPassword', {
    name: 'forgotPassword',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/adminLTE.js'
        ]
    }
});

Router.route('/userProfile', {
    name: 'userProfile',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/adminLTE.js'
        ]
    }
});

Router.route('/truckInformation', {
    name: 'truckInformation',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/select2.min.css',
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/skin-lemeat.css'
        ],
        'sync':[
            '/plugins/select2.min.js',
            '/plugins/bootstrap.min.js',
            '/plugins/adminLTE.js'
        ]
    },
    subscriptions: function() {
    return Meteor.subscribe('truckCardImg');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/truckAgenda', {
    name: 'truckAgenda',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/dataTables.bootstrap.css',
            '/styles/daterangepicker-bs3.css',
            '/styles/jquery.dataTables.min.css'],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/jquery.dataTables.min.js',
            '/plugins/dataTables.bootstrap.min.js',
            '/plugins/daterangepicker.js',
            '/plugins/moment.min.js',
            '/plugins/adminLTE.js']
    },
    subscriptions: function() {
        return Meteor.subscribe('truckAgendaAll');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/truckImages', {
    name: 'truckImages',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/skin-lemeat.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/adminLTE.js'
        ]
    }
});

Router.route('/truckMap', {
    name: 'truckMap',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/skin-lemeat.css',
            '/styles/daterangepicker-bs3.css'],
        'sync':[
            '/plugins/bootstrap.min.js',
            '/plugins/daterangepicker.js',
            '/plugins/moment.min.js',
            '/plugins/adminLTE.js']
    }
});

Router.route('/truckEvents', {
    name: 'truckEvents',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/skin-lemeat.css',
            '/styles/daterangepicker-bs3.css',
            '/styles/select2.min.css'
        ],
        'sync':[
            '/plugins/select2.min.js',
            '/plugins/bootstrap.min.js',
            '/plugins/daterangepicker.js',
            '/plugins/moment.min.js',
            '/plugins/adminLTE.js'
        ]
    },
    subscriptions: function() {
        return Meteor.subscribe('truckEventsAll');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});
