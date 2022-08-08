const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost:27017/test");

let contactSchema = new Schema({
    code: {
        type: Number
    },
    siduser: {
        type: String,
        require: true
    },
    sidcontact:{
        type: String
    },
    state: {
        type: Number,
        default: 0
    },
    alias: {
        type: String
    },
    message: {
        type: String,
        require: false
    },
    badge: {
        type: Number,
        default: 0
    },
    enter : {
        type: Date
    },
    avatar: {
        type: String,
        default: ''
    }
});

contactSchema.methods.toJSON = function(){
    let contactAlpha = this;
    let contactObject = contactAlpha.toObject(); 

    return contactObject;
}

module.exports = mongoose.model('contacts',contactSchema);