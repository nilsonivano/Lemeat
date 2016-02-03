var Schemas = {};

Schemas.contacts = new SimpleSchema({
    email: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    },
    phone: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    facebook: {
        type: String,
        optional: true,
        defaultValue: ""
        //regEx: SimpleSchema.RegEx.Url
    },
    instagram: {
        type: String,
        optional: true,
        defaultValue: ""
        //regEx: SimpleSchema.RegEx.Url
    },
    twitter: {
        type: String,
        optional: true,
        defaultValue: ""
        //regEx: SimpleSchema.RegEx.Url
    },
    website: {
        type: String,
        optional: true,
        defaultValue: ""
        //regEx: SimpleSchema.RegEx.Url
    }
});

Schemas.truckProfile = new SimpleSchema({
    name: {
        type: String,
        label:"Nome do Truck"
    },
    speciality:{
        type: String,
        optional: true,
        label:"Especialidade do Truck",
        defaultValue: ""
    },
    img: {
        type: String,
        optional: true,
        label:"Url da Imagem do Truck"
    },
    tags:{
        type: [String],
        optional: true
    },
    description:{
        type: String,
        label:"Breve descrição do truck",
        optional: true,
        max: 200,
        defaultValue: ""
    },
    fullDescription:{
        type: String,
        optional: true,
        label:"Descrição completa do truck",
        defaultValue: ""
    },
    menu: {
        type: String,
        label: "Menu do Food Truck",
        optional: true,
        defaultValue: ""
    },
    mainCity: {
        type: String,
        label: "Principal Cidade",
        optional: true,
        defaultValue: ""
    },
    contacts: {
        type: Schemas.contacts,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.truckProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schemas.User);