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

let accountSchema = new Schema({
    number: {
        type: Number
    },
    iduser: {
        type: String,
        required: [true, 'El id del usuario es requerido'],
    },
    description: {
        type: String,
    },
    balance:{
        type: Number,
        default: 0
    },
    create_at: {
        type: Date
    },
    type: {
        type: String,
        enum: validAccountsTypes
    },
});

accountSchema.methods.toJSON = function(){
    let account = this;
    let accountObject = account.toObject();
    return accountObject;
}

module.exports = mongoose.model('accounts', accountSchema);