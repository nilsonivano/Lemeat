Template.appLayout.onCreated(function(){
    require('/imports/styles/bootstrap.css');
    require('/imports/styles/AdminLTE.css');
    require('/imports/styles/skin-lemeat.css');
    require('/imports/styles/daterangepicker-bs3.css');
    require('/imports/styles/select2.min.css');
    require('/imports/plugins/bootstrap.js');
    require('/imports/plugins/adminLTE.js');
    require('/imports/plugins/daterangepicker.js');
    require('/imports/plugins/select2.min.js');
    require('/imports/styles/dataTables.bootstrap.css');
    require('/imports/styles/jquery.dataTables.min.css');
    require('/imports/plugins/jquery.dataTables.min.js');
});

Template.appLayout.events({
    'click #menuToggle': function(){
        $('body').toggleClass("sidebar-open");
    },
    'click #logout': function(){
        Meteor.logout(function(err){
            if(err){
                console.log(err.reason);
            }
            else{
                Router.go('login');
            }
        });
    }
});

Template.appLayout.helpers({
    'user': function(){
        return Meteor.user();
    },
    'countEventsMenu': function(){
        return ReactiveMethod.call('getValidEventsCount');
    }
});