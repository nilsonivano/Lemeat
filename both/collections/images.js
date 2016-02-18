//ImageUpload Config
if(Meteor.isServer){
    var bucketUrl = Meteor.settings.public.bucketUrl;
    var accessKeyId = Meteor.settings.accessKeyId;
    var secretAccessKey = Meteor.settings.secretAccessKey;
    var bucketName = Meteor.settings.bucketName;
}

FS.debug = true;

ImageUpload.configure({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    bucketName: bucketName,
    bucketUrl: bucketUrl
});

truckCardImg = ImageUpload.createCollection("truckCardImg", Meteor.users, {
    maxUploadSize: 4,
    defaultPermissions: false,
    publicRead: true,
    sizes: {
        normal: [800,800],
        thumbnail: [200, 200],
        avatar: [50, 50]
    }
});

truckImg = ImageUpload.createCollection("truckImg", Meteor.users, {
    maxUploadSize: 4,
    defaultPermissions: false,
    publicRead: true,
    sizes: {
        normal: [800,600],
        thumbnail: [200,150]
    }
});