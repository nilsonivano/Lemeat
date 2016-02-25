//SEO Configs
Meteor.startup(function() {
    if(Meteor.isClient){
        return SEO.config({
            title: 'Lemeat - Tudo para Food Trucks',
            meta: {
                'description': 'O Lemeat é uma solução completa para Food Trucks que querem divulgar suas agendas,' +
                'organizar seus itinerários e receber oportunidades de eventos. Quer entrar em nosso mapa? Cadastre seu' +
                'truck em nossa plataforma gratuita.'
            },
            og: {
                'image': 'http://lemeat.com/images/lemeat_launcher_icon.png'
            }
        });
    }
});