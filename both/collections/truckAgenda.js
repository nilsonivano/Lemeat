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
    truckId: {
        type: String,
        label: "TruckId",
        optional: true
    },
    addedBy: {
        type: String,
        label: "Author"
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