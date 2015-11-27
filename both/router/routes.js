Router.route('/', {
  name: 'landing',
  controller: PreloadController,
  'preload':{
      'verbose':true,
      'styles':['styles/flat-ui/css/flat-ui.css',
          'styles/common-files/css/icon-font.css',
          'styles/common-files/css/animations.css',
          'styles/ui-kit/ui-kit-contacts/css/style.css',
          'styles/ui-kit/ui-kit-footer/css/style.css',
          'styles/ui-kit/ui-kit-content/css/style.css',
          'styles/ui-kit/ui-kit-header/css/style.css'],
      'sync':['plugins/easing.min.js',
          'plugins/jquery.svg.js',
          'plugins/jquery.svganim.js',
          'plugins/modernizr.custom.js',
          'plugins/page-transitions.js',
          'plugins/startup-kit.js']
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
        'styles':['styles/06_dataTables.bootstrap.css',
            'styles/07_daterangepicker-bs3.css',
            'styles/08_jquery.dataTables.min.css'],
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
