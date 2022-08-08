/*
Class users
    methods:
        get()
        post()
        put()
        delete()
        login()
        verifyUser()
date: 08//11/2019
developer: developer1 sekret
*/
const express = require('express');
const app = express();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const JwToken = require('../classes/tokenj');
const verifyToken = require('../../middlewares/auth');

const contacts = require('../models/contacts');
//const  device = require('express-device');
const AES = require("crypto-js/aes");
const utf8 = require('crypto-js/enc-utf8');







app.get('/user/info', (req,res)=>{
    const body = req.query;
    User.findOne({ username : body.username }, (err, userDB)=>{
        if (err) throw err;
        if (!userDB){
            return res.json({
                ok: false,
                msj: 'No se puede actualizar la informacion'
            });
        }else{
            return res.json({
                ok: true,
                userDB
            })
        }                 
    });  
}), 


app.post('/user/create', function (req, res) {

    let body = req.body;
    console.log('INFORMACION IN', body)
    let now = new Date();
     //rand_code("ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789", 10);

    let user = new User({
        code: body.code,
        username: body.username,
        name: body.name,
        document: body.document,
        documenttype: body.documentType,
        password: bcrypt.hashSync(body.password, 10),
        secondpass: bcrypt.hashSync(body.secondpass, 10),
        img: body.img,
        create_at: now,
        update_at: now,
        delete_at: null,
        type: body.type,
    });
    user.save((err, userDB) => {     
        /*jswt */
        if (err) {
            return res.status(400).json({
                err
            });
        }else{
            res.json({
                ok: true,
            })
        }
    })
});


app.post('/user/login', (req , resp) =>{   
    try {        
        const body = req.body;
        User.findOne({username : body.username}, (err, userDB)=>{
            if (err) throw err;
            if (!userDB){
                return resp.json({
                    ok: false,
                    msj: 'Usuario y/o Password Incorrecto'
                });
            }
            console.log(userDB)
            if ( userDB.comparePassword(body.password) ) {
                const jwtoken = JwToken.getJwtToken({
                    _id: userDB._id,
                    sekretid: userDB.sekretid,
                    username: userDB.username,
                    avatar : userDB.avatar
                });
             
                resp.json({
                    ok: true,
                    sekretid: userDB.sekretid,
                    _id: jwtoken,
                });
    
            }else{
                return resp.json({
                    ok: false,
                    msj: 'Usuario y/o Password Incorrecto'
                });
            }        
        });     
    } catch (error) {
        resp.json({ok: false})
    }
    
   
})












function rand_code(chars, lon){
    code = "";
    for (x=0; x < lon; x++){
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }
        return code;
    }

module.exports = app;