Router.route('/', {
  name: 'landing',
  controller: PreloadController,
  'preload':{
      'verbose':true,
      'styles':[
          'stylesLanding/flat-ui/css/flat-ui.css',
          'stylesLanding/common-files/css/icon-font.css',
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

Router.route('/frontPage', {
    name: 'lemeatSite',
    controller: PreloadController,
    'preload':{
        'verbose': true,
        'styles':[
            'stylesSite/style.css',
            'stylesSite/dark.css',
            //'stylesSite/font-icons.css',
            'stylesSite/animate.css',
            'stylesSite/magnific-popup.css',
            'stylesSite/responsive.css'
        ],
        'sync':[
            'plugins/pluginsSite.js',
            'plugins/functions.js'
        ]
    }
});

Router.route('/login', {
    name: 'login'
});

Router.route('/register', {
    name: 'register'
});

Router.route('/truckInformation', {
    name: 'truckInformation',
    layoutTemplate: 'appLayout'
});

Router.route('/truckAgenda', {
    name: 'truckAgenda',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'verbose':true,
        'styles':['stylesLanding/06_dataTables.bootstrap.css',
            'stylesLanding/07_daterangepicker-bs3.css',
            'stylesLanding/08_jquery.dataTables.min.css'],
        'sync':['plugins/02_jquery.dataTables.min.js',
            'plugins/03_dataTables.bootstrap.min.js',
            'plugins/04_daterangepicker.js',
            'plugins/05_moment.min.js']
    }
});

Router.route('/truckImages', {
    name: 'truckImages',
    layoutTemplate: 'appLayout'
});

Router.route('/truckMap', {
    name: 'truckMap',
    layoutTemplate: 'appLayout',
    controller: PreloadController,
    'preload':{
        'verbose':true,
        'styles':['stylesLanding/07_daterangepicker-bs3.css'],
        'sync':['plugins/04_daterangepicker.js',
            'plugins/05_moment.min.js']
    }
});

Router.route('/truckEvents', {
    name: 'truckEvents',
    layoutTemplate: 'appLayout'
});
