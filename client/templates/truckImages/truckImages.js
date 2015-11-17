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
    }
});

Template.truckImages.helpers({
    'truckImages': function(){
        var user = Meteor.userId();
        var images =  truckImg.find({addedBy: user }).fetch();
        if (images){
            console.log(images);
            return images;
        }
    }
})