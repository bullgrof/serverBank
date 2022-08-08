const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

let validRols = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} No es un rol valido'
}

let accountTypes = {
    values: ['Ahorros', 'Corriente'],
    message: '{VALUE} No es un tipo de cuenta permitida'
}

let Schema = mongoose.Schema;

//var connection = mongoose.createConnection("mongodb+srv://nemessisbank:OVRbLUBcxlBhIaRa@mybank.uv7uxhi.mongodb.net/bankDB");

//autoIncrement.initialize(connection);


let userSchema = new Schema({
    code: {
        type: Number
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    secondpass: {
        type: String
    },

    state: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRols
    },

    create_at: {
        type: Date
    },
    update_at: {
        type: Date
    },
    delete_at: {
        type: Date,
        default: null
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    type: {
        type: String,
        enum: accountTypes
    },
    name: {
        type: String
    },
    document:{
        type: String
    },
    documenttype:{
        type: String
    }

});

userSchema.method('compa', function (spt = '') {
    if (bcrypt.compareSync(spt, this.spt)) {
        return true;
    } else {
        return false;
    }
});

userSchema.method('comparetuw', function (password = '') {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

userSchema.method('comparePassword', function (password = '') {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

userSchema.method('compareSecondPass', function (password = '') {
    if (bcrypt.compareSync(password, this.secondpass)) {
        return true;
    } else {
        return false;
    }
});

userSchema.methods.toJSON = function () {
    let useralpha = this;
    let userObject = useralpha.toObject();
    delete userObject.password;
    delete userObject.secondpass;
    
    delete userObject.role;
    delete userObject.create_at;
    delete userObject.delete_at;
    delete userObject.update_at;
    

    return userObject;
}
module.exports = mongoose.model('users', userSchema);