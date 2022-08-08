const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validplans = {
    values: ['Plan Promocional','Plan Go', 'Plan Plus'],
    message: '{VALUE} No es un plan valido'
}

let Schema = mongoose.Schema;

let planSchema = new Schema({
    desc: {
        type: String,
        unique: true,
        required: [true, 'El nombre del plan es necesario']
    },
    timetoexpire: {
        type: Number,
        required: [true, 'El numero de dias es requerido']
    },
    state: {
        type: String,
        required : true
    },
    type: {
        type: String,
        enum: validplans,
        required: [true, 'El tipo de plan es requerido']
    },
    idplan: {
        type: String,
    },
    stateplan:{
        type: String
    }
});

planSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser unico'
} )

module.exports = mongoose.model('plans', planSchema);