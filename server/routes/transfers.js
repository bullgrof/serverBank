const express = require('express');
const app = express();
const Transfer = require('../models/transfers');
const bcrypt = require('bcrypt');
const JwToken = require('../classes/tokenj');
const verifyToken = require('../../middlewares/auth');
const Account = require('../models/accounts');




app.post('/transfer/create', (req, res)=>{
    let body = req.body;
    let now  = new Date();
    let aBO;
    let aBD;
    let balNeWOri;
    let balNeWDes;

    console.log(body)
    let transfer = new Transfer({
        accounOrigin:   body.origin,
        iduser:         body.iduser,
        accountDestiny: body.destiny,
        value:          body.value,
        create_at:      now,
        type:           body.type,
        description:    body.description
    })

    transfer.save((err,transferDB)=>{
        if (err) {
            return res.status(400).json({
                err
            });
        }else{
            res.json({
                ok: true,
                msj: "Movimiento realizado con exito",
                transferDB
            })
        }
    })

    Account.find({"number" : body.origin })
        .exec((err, originDB) => {
            if (err) {
                console.log(err);
            }else{
                aBO = originDB[0].balance;
                
                let idOrigin = originDB[0]._id;
                if (aBO < body.value) {
                    console.log('No se puede ralizar la transferencia');
                }else{
                    balNeWOri = originDB[0].balance - body.value;
                    console.log(' ++ ++ + ++ +  ++',idOrigin)
                    console.log(' ++ ++ + ++ +  ++',balNeWOri)
                    const  balanceUpdateOrigin = { balance : balNeWOri }
                    Account.findByIdAndUpdate(
                        { _id : idOrigin }, balanceUpdateOrigin, {new : true}, (err, userOriginUpdate)=>{
                        if (err) {
                            console.log('No se hapodido actualizar la cuenta de origen');
                        }else{
                            console.log('actualizado con exito');
                        }
                    })


                }
            }
        })

        Account.find({"number" : body.destiny })
        .exec((err, destinyDB) => {
            if (err) {
                console.log(err);
            }else{
                if (!destinyDB) {   
                    
                }else{
                    console.log('paso')               
                    aBD = destinyDB[0].balance;
                    let idDestiny = destinyDB[0]._id;
              
                    balNeWDes = destinyDB[0].balance + body.value;
                    const  balanceUpdateDestin = { balance : balNeWDes }
                    Account.findByIdAndUpdate({ _id : idDestiny }, balanceUpdateDestin, {new : true}, (err, userOriginUpdate)=>{
                        if (err) {
                            console.log('No se hapodido actualizar la cuenta de Destino');
                        }else{
                            console.log('actualizado con exito el destino' );
                        }
                    })
                    console.log('No se puede actualizar la cuenta de Destino');
                }                
            }
        })  
})


module.exports = app;