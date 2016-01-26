Router.route('/', {
  name: 'landing',
  controller: PreloadController,
  'preload':{
      'styles':[
          'stylesLanding/flat-ui/css/flat-ui.css',
          'stylesLanding/common-files/css/icon-fonts.css',
          'stylesLanding/common-files/css/animations.css',
          'stylesLanding/ui-kit/ui-kit-contacts/css/style.css',
          'stylesLanding/ui-kit/ui-kit-footer/css/style.css',
          'stylesLanding/ui-kit/ui-kit-content/css/style.css',
          'stylesLanding/ui-kit/ui-kit-header/css/style.css'],
      'sync':[
          'plugins/easing.min.js',
          'plugins/jquery.svg.js',
          'plugins/jquery.svganim.js',
          'plugins/modernizr.custom.js',
          'plugins/page-transitions.js',
          'plugins/startup-kit.js']
  }
});
// Website routing

Router.route('/home', {
    name: 'lemeatHome',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/stylesSite/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    }
});

Router.route('/truckProfile/:truckId', {
    name: 'truckProfile',
    layoutTemplate: 'siteLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/stylesSite/materialize.css'
        ],
        'sync':[
            '/plugins/materialize.js'
        ]
    },
    data: function(){
        truckId = this.params.truckId;
        var truckProfile = Meteor.users.findOne({_id: truckId },{fields: {'profile': 1}});
        this.subscribe('siteTruckProfileImg',truckId);
        var truckImages = truckImg.find({addedBy: truckId}).fetch();
        return [truckProfile,truckImages]
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
            '/plugins/bootstrap.min.js'
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
            '/plugins/bootstrap.min.js'
        ]
    }
});

Router.route('/truckInformation', {
    name: 'truckInformation',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'styles':[
            '/styles/bootstrap.min.css',
            '/styles/AdminLTE.css',
            '/styles/skin-lemeat.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js'
        ]
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
            '/plugins/02_jquery.dataTables.min.js',
            '/plugins/03_dataTables.bootstrap.min.js',
            '/plugins/04_daterangepicker.js',
            '/plugins/05_moment.min.js']
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
            '/plugins/bootstrap.min.js'
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
            '/plugins/04_daterangepicker.js',
            '/plugins/05_moment.min.js']
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
            '/styles/skin-lemeat.css'
        ],
        'sync':[
            '/plugins/bootstrap.min.js'
        ]
    }
});
