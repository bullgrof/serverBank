const express = require('express');
const app = express();
const Inscription = require('../models/inscriptions');
const bcrypt = require('bcrypt');
const JwToken = require('../classes/tokenj');
const verifyToken = require('../../middlewares/auth');



//getMyAccounts = function
app.get('/inscriptions/getMyinscriptions', function (req, res) {
    let id = req.query.id;
    let type = req.body.type;
    Inscription.find({
        "idowner": id, 
    }).exec((err, accounts)=>{
        if (err) {
            return res.status(400).json({
                err,
                msj: 'No tiene cuentas inscritas'
            })
        }
            res.json({
                accounts
            })        
    })
})


app.post('/inscriptions/enroll', ( req,res ) =>{
    let body = req.body;
    console.log(body)
    let now = new Date();

    try {
        Inscription.findOne({account : body.account},(err, enrollDB)=>{
            if (err) throw err;
            if (!enrollDB){
                let enroll = new Inscription({
                    alias:    body.alias,           
                    banking:  body.banking,
                    type:     body.type,
                    account:  body.account,
                    id:       body.id, //CC
                    currency: body.currency,
                    idowner:  body.owner,
                    create_at:now,
                });
            
                enroll.save((err, enrollDB)=>{
                    if (err) {
                        return res
                            .status(400)
                            .json({
                                err,
                                ok: false
                            })
                    }else{
                        res.json({
                            ok: true,
                            msj: 'Cuenta inscrita exitosamente'
                        })
                    }
                })
            }else{
                return res.json({
                    ok: false,
                    para: 1,
                    msj: 'La cuenta ya se cuentra registrada con otro alias'
                })
            }
        })
    } catch (error) {
        res.json({
            ok: false,
            msj: 'No se puede inscribir la cuenta'
        })
    }

    






    
})

app.get('/')


module.exports = app;