Template.truckImages.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    }else {
        Meteor.subscribe('truckImg');
    }
});

Template.truckImages.events({
    'change form': function(event,template){
        event.preventDefault();
        var file = event.target.files[0];
        if (file){
            var newFile = new FS.File(file);
            newFile.addedBy = Meteor.userId();
            truckImg.insert(newFile,function(err){
                if(err){
                    toastr.error("Alguma coisa deu errado");
                } else{
                    toastr.success("Imagem inserida com sucesso");
                }
            });
        }
    },
    'click [name=deleteImg]': function(event){
        event.preventDefault();
        var id = event.target.id;
        Meteor.call('removeTruckImg', id, function(err){
            if(err){
                toastr.error("Alguma coisa deu errado");
            } else{
                toastr.success("Imagem removida com sucesso");
            }
        })
    }
});

Template.truckImages.helpers({
    'truckImages': function(){
        var user = Meteor.userId();
        var images =  truckImg.find({addedBy: user}).fetch();
        if (images){
            return images;
        }
    },
    'truckId': function(){
        return Meteor.userId()
    }
});