
//SEO Configs
if(Meteor.isClient){
    Router.plugin('seo',
    {
        defaults: {
            title: 'Lemeat - Tudo para seu Food Truck em um lugar só',
            description: 'O Lemeat é uma solução completa para Food Trucks que querem divulgar suas agendas,' +
            'organizar seus itinerários e receber oportunidades de eventos. Quer entrar em nosso mapa? Cadastre seu' +
            'truck em nossa plataforma gratuita.',
            image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
            meta: {
                keywords: ['Lemeat', 'foodtrucks', 'foodtruck', 'comida', 'itinerante', 'mapa de foodtrucks', 'mapa',
                'comida itinerante', 'food truck', 'food bike', 'Food Truck', 'comida itinerante']
            },
            twitter: {
                card: 'Lemeat'
            },
            og: {
                site_name: 'Lemeat - Tudo para Food Trucks',
                title: 'Lemeat - Tudo para seu Food Truck em um lugar só',
                description: 'O Lemeat é uma solução completa para Food Trucks que querem divulgar suas agendas,' +
                'organizar seus itinerários e receber oportunidades de eventos. Quer entrar em nosso mapa? Cadastre seu' +
                'truck em nossa plataforma gratuita.',
                image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
                type: 'website'
            }
        }
    });
}
// Website routing

Router.route('/', {
    name: 'lemeatHome',
    layoutTemplate: 'siteLayout',
    template: 'lemeatHome',
    fastRender: true,
    subscriptions: function() {
        return (Meteor.subscribe('siteTruckProfileAll'),
                Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render()
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/home', {
    name: 'lemeatHome2',
    layoutTemplate: 'siteLayout',
    template: 'lemeatHome',
    fastRender: false,
    subscriptions: function() {
        return (Meteor.subscribe('siteTruckProfileAll'),
            Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/truckProfile/:truckId', {
    name: 'truckProfile',
    layoutTemplate: 'siteLayout',
    fastRender: true,
    subscriptions: function() {
        var truckId = Router.current().params.truckId;
        return (Meteor.subscribe('siteTruckProfileImg',truckId),
                Meteor.subscribe('truckProfile', truckId),
                Meteor.subscribe('truckAgenda',truckId)
        );
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/tags/:tags', {
    name: 'lemeatSearchTags',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    subscriptions: function() {
        var tags = Router.current().params.tags;
        return (Meteor.subscribe('tagSearchTruck',tags),
                Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/city/:mainCity', {
    name: 'lemeatSearchCity',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    subscriptions: function() {
        var mainCity = Router.current().params.mainCity;
        return (Meteor.subscribe('citySearchTruck',mainCity),
                Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/city/:mainCity/tags/:tags', {
    name: 'lemeatSearchCityTags',
    template: 'lemeatSearch',
    layoutTemplate: 'siteLayout',
    subscriptions: function() {
        var mainCity = Router.current().params.mainCity;
        var tags = Router.current().params.tags;
        return (Meteor.subscribe('cityTagsSearchTruck',tags,mainCity),
                Meteor.subscribe('truckAgendaAll'));
    },
    action: function () {
        if (this.ready()) {
            this.render('lemeatLoading');
            Meteor.setTimeout(this.render(), 5000);
            ;
        } else {
            this.render('lemeatLoading');
        }
    }
});

// App for truckers routing

Router.route('/login', {
    name: 'login',
    template: 'login',
    fastRender: true
});

Router.route('/register', {
    name: 'register',
    fastRender: true

});

Router.route('/forgotPassword', {
    name: 'forgotPassword',
    fastRender: true
});

Router.route('/resetPassword/:token', {
    name: 'resetPassword',
    fasterRender: true
});

Router.route('/userProfile', {
    name: 'userProfile',
    layoutTemplate: 'appLayout'
});

Router.route('/truckInformation', {
    name: 'truckInformation',
    layoutTemplate: 'appLayout',
    subscriptions: function() {
    return Meteor.subscribe('truckCardImg');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/truckAgenda', {
    name: 'truckAgenda',
    layoutTemplate: 'appLayout',
    subscriptions: function() {
        return Meteor.subscribe('truckAgendaAll');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/truckImages', {
    name: 'truckImages',
    layoutTemplate: 'appLayout',
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/truckMap', {
    name: 'truckMap',
    layoutTemplate: 'appLayout',
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});

Router.route('/truckEvents', {
    name: 'truckEvents',
    layoutTemplate: 'appLayout',
    subscriptions: function() {
        return Meteor.subscribe('truckEventsAll');
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('lemeatLoading');
        }
    }
});
