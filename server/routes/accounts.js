const express = require('express');
const app = express();
const Account = require('../models/accounts');

const bcrypt = require('bcrypt');
const JwToken = require('../classes/tokenj');
const verifyToken = require('../../middlewares/auth');



app.get('/account/getMyBalanceByidUser', function (req, res) {
    console.log('PASOOOOOOo')
    let id = req.query.id;
    let type = req.body.type;
    Account.find({
        "iduser": id, 
    }).exec((err, accountDetail)=>{
        if (err) {
            return res.status(400).json({
                err,
                msj: 'La informacion no puede ser traida en este momento'
            })
        }
            res.json({
                accountDetail
            })        
    })
})




//get Infor Account

app.get('/account/getMyBalanceByAccount', function (req, res) {
    let number = req.query.number;
    let type = req.body.type;
    Account.find({
        "number": number, 
    }).exec((err, accountDetail)=>{
        if (err) {
            return res.status(400).json({
                err,
                msj: 'La informacion no puede ser traida en este momento'
            })
        }
            res.json({
                accountDetail
            })        
    })
})


// consult my Balance or account selected 
app.get('/account/getMyBalance', function (req, res) {
    let iduser = req.query.idUser;
    let type = req.body.type;
    Account.find({
        "iduser": iduser, 
    }).exec((err, accountDetail)=>{
        if (err) {
            return res.status(400).json({
                err,
                msj: 'La informacion no puede ser traida en este momento'
            })
        }
            res.json({
                accountDetail
            })        
    })
})




//activate aacount with login user
app.post('/accounts/activate', (req,res)=> {
    
    let body = req.body;
    let accountNumber =  rand_code("0123456789", 11);
    let now = new Date();

    let account = new Account({
        number:     accountNumber,
        iduser:     body.iduser,
        type:       body.type,
        description: body.description,
        create_at:  now
    })

    account.save((err, accountDB)=>{
        if (err) {
            return res.status(400).json({
                err
            });
        }else{
            res.json({
                ok: true,
                msj: "Cuenta Activada con exito"
            })
        }
    })
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