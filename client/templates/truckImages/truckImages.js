Template.truckImages.onCreated(function(){
    if (!Meteor.userId()) {
        Router.go('login')
    }
});

Template.truckImages.events({
    'change form': function(event,template){
        event.preventDefault();
        console.log(event);
        var file = event.target.files[0];
        if (file){
            var newFile = new FS.File(file);
            newFile.addedBy = Meteor.userId();
            console.log(newFile);
            truckImg.insert(newFile,function(err){
                if(err){
                    console.log(err);
                } else{
                    console.log("Sucesso!!!!");
                }
            });
        }
    },
    'click [name=deleteImg]': function(event){
        event.preventDefault();
        var id = event.target.id;
        console.log(id);
        truckImg.remove({_id: id}, function(err){
            if(err){
                console.log(err)
            } else {
                //if($("#truckImgCarousel").find(".active") != true ){
                //    $("[data-slide-to=0]").addClass("active");
                //    $("[indexAux=0").addClass("active");
                //
                //}
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
    }
})