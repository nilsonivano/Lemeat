truckEvents = new Mongo.Collection('truckEvents');

var Schemas = {};

Schemas.contactsEvent = new SimpleSchema({
    email: {
        type: String,
        optional: true,
        defaultValue: "",
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
    },
    instagram: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    twitter: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    website: {
        type: String,
        optional: true,
        defaultValue: ""
    }
});

Schemas.truckEvents = new SimpleSchema({
    dateStart: {
        type: Date,
        label: "Agenda start"
    },
    dateEnd:{
        type: Date,
        label: "Agenda end"
    },
    eventType:{
        type: String,
        label: "Tipo do evento"
    },
    eventDescription:{
        type: String,
        label:"Descrição do evento"
    },
    address: {
        type: String,
        label:"Agenda Address"
    },
    lat:{
        type: String
    },
    lng:{
        type: String,
        optional: true
    },
    addressReference:{
        type: String,
        label:"Address Reference",
        optional: true
    },
    city:{
        type: String,
        label:"City Reference",
        optional: true
    },
    addedBy: {
        type: String,
        label: "User Author"
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    contacts: {
        type: Schemas.contactsEvent,
        optional: true
    },
    visibleToTruck: {
        type: [String],
        optional: true
    },
    visibleToAll: {
        type: Boolean
    }
});

truckEvents.attachSchema(Schemas.truckEvents);