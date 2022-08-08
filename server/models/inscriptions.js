
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;
//autoIncrement.initialize(connection);
var connection = mongoose.createConnection("mongodb+srv://nemessisbank:OVRbLUBcxlBhIaRa@mybank.uv7uxhi.mongodb.net/bankDB");

let accountTypes = {
    values: ['Ahorros', 'Corriente'],
    message: '{VALUE} No es un tipo de cuenta permitida'
}

let currenciesTypes = {
    values: ['COP', 'USD'],
    message: '{VALUE} No es un tipo de cuenta permitida'
}

let inscriptionsSchema = new Schema({
    alias:{
        type: String,
    },
    
    banking:{
        type: String,
    },
    type:{
        type: String,
        enum: accountTypes
    },
    account:{
        type: String,
    },
    id:{
        type: Number,
    },
    currency:{
        type: String,
        enum: currenciesTypes
    },
    idowner:{
        type: String
    }
})

inscriptionsSchema.methods.toJSON = function () {
    let inscription = this;
    let inscriptionObject = inscription.toObject();

    return inscriptionObject;
};

module.exports = mongoose.model('inscriptions', inscriptionsSchema);



