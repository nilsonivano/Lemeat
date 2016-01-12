truckEvents = new Mongo.Collection('truckEvents');

var Schemas = {};

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
    address: {
        type: String,
        label:"Agenda Address"
    },
    lat:{
        type: String,
        optional: true
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
        type: Schemas.contacts,
        optional: true
    }
});

truckEvents.attachSchema(Schemas.truckEvents);