Router.route('/', {
  name: 'home'
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
    layoutTemplate: 'appLayout'
});

Router.route('/truckImages', {
    name: 'truckImages',
    layoutTemplate: 'appLayout'
});
