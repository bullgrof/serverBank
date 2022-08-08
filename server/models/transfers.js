const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


let validAccountsTypes = {
    values: ['AHORROS', 'CORRIENTE'],
    message: '{VALUE} No es un tipo de cuenta valido'
}

let Schema = mongoose.Schema;
//autoIncrement.initialize(connection);
var connection = mongoose.createConnection("mongodb+srv://nemessisbank:OVRbLUBcxlBhIaRa@mybank.uv7uxhi.mongodb.net/bankDB");

let transferSchema = new Schema({
    accounOrigin: {
        type: Number
    },
    iduser: {
        type: String,
        required: [true, 'El id del usuario es requerido'],
    },
    accountDestiny: {
        type: Number,
    },
    value:{
        type: Number,
    },
    create_at: {
        type: Date
    },
    type: {
        type: String,
        enum: validAccountsTypes
    },
    description: {
        type: String,
    },
});

transferSchema.methods.toJSON = function () {
    let transfer       = this;
    let transferObject = transfer.toObject();
    return transferObject;
}

module.exports = mongoose.model('transfers', transferSchema);