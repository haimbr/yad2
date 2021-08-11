const mongoose = require("mongoose");


const apartmentSchema = new mongoose.Schema(
    {
        typeOfProperty: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        street: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        houseNumber: {
            type: Number,
        },
        floor: {
            type: Number,
        },
        floorsInBuilding: {
            type: Number,
        },
        roomsNum: {
            type: Number,
        },
        parkingsNum: {
            type: Number,
        },
        balconiesNum: {
            type: Number,
        },
        apartmentDesc: {
            type: String,
            trim: true,
        },
        apartmentProperties: {
            type: Array,
        },
        paymentsNum: {
            type: Number,
        },
        houseCommittee: {
            type: Number,
        },
        propertyTax: {
            type: Number,
        },
        size: {
            type: Number,
        },
        price: {
            type: Number,
        },
        entryDate: {
            type: Date,
        },
        isLongTerm: {
            type: Boolean,
        },
        files: {   
            type: Array,
        },
        contacts: { type : Array , "default" : [] },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

    },
    {
        timestamps: true,
    }
);

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;