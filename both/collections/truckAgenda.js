truckAgenda = new Mongo.Collection('truckAgenda');

var Schemas = {};

Schemas.truckAgenda = new SimpleSchema({
    dateStart: {
        type: Date,
        label: "Agenda start"

    },
    dateEnd:{
        type: Date,
        label: "Agenda end"

    },
    address: {
        type: String,
        label:"Agenda Address"
    },
    city:{
        type: String,
        label:"City Reference",
        optional: true
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
    truckName: {
        type: String,
        label: "truckName"
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
    }
});

truckAgenda.attachSchema(Schemas.truckAgenda);