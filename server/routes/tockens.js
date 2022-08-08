/*
Class tokens
    methods:
        get()
        post()
        put()
        delete()
*/


const express = require('express');
const Tocken = require('../models/tockens');
const User = require('../models/users');
const app = express();
var dateFormat = require('dateformat');
const tokenClass = require('../classes/toke');
const verifyToken = require('../../middlewares/auth');
const FileSystem = require('../classes/flSy.js');
const validvepan = "@4CwQx@8G!Ghdj89OzLP&afif*HDwpRpE&kQ";
let flSystem = new FileSystem();


app.post('/token/ren', verifyToken,function (req, res) {
    
    days = req.body.daysplan;
    days = days - 1;
    dateNow = new Date();   
    dateShort = dateFormat(dateNow, "dd-mm-yyyy");
    console.log('Fecha Corta', dateShort);

    expireUser = req.body.expire_in.split('T');
    nExpU = expireUser[0].split('-');
    newExpireUser = nExpU[2]+'-'+nExpU[1]+'-'+nExpU[0]
    console.log('FECHA DE EXPIRACION NUEVA DEL USUARIO: ', newExpireUser);

    remainDays = remaining(dateShort, newExpireUser);
    if (remainDays <= 1 ) {
        console.log('Renueva con la fecha actual');
        now = new Date();
        console.log('fecha capturada por el servidor : ', now);
        dateUpdate = now.setDate( now.getDate() + days );
        dateUUUU = dateFormat(dateUpdate, "yyyy-mm-dd");
        console.log('Fecha con dias sumados', dateUUUU);

        const user = {
            expire_in: dateUUUU
        }
        iduser = req.body.iduser;

        User.findByIdAndUpdate(
            { _id: iduser }, user, { new: true }, (err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    user: userDB
                });
            })

        token = {
            state : "0",
            iduser : iduser
        }
        idToken = req.body.idToken
        Tocken.findByIdAndUpdate(
            {_id : idToken }, token , { new: true }, (err, tokenDB) => {
                if (err) {
                    console.log(err)
                }
            }
        )
        
    }else{
        console.log('Renueva con la fecha de expiracion');
       // dateExpireUser = dateFormat(req.body.expire_in,"yyyy-mm-dd");
        now2 = new Date(req.body.expire_in);
       
        dateToUpdate = now2.setDate( now2.getDate() +  days);
        dateToUpdate = dateFormat(dateToUpdate, "yyyy-mm-dd");
       
        const user = {
            expire_in: dateToUpdate
        }
        iduser = req.body.iduser;

        User.findByIdAndUpdate(
            { _id: iduser }, user, { new: true }, (err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    user: userDB
                });
            })
        token = {
            state: "0",
            iduser: iduser
        }
        idToken = req.body.idToken
        Tocken.findByIdAndUpdate(
            { _id: idToken }, token, { new: true }, (err, tokenDB) => {
                if (err) {
                    console.log(err)
                }
            }
        )
    }
})


function remaining(f1, f2){
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias
}


app.get('/token/dateServer', function (req, res) {
    console.log('obteniendo fecha del servidor');
    let f = new Date();
    var now = new Date();
    datelong = dateFormat(now, "ddd mmm dd yyyy HH:MM:ss");
    dateShort = dateFormat(now, "dd/mm/yyyy");
    datenow =  f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();

    res.json({
        ok: true,
        datenow,
        datelong,
        dateShort
    })
})


/* Method verify Token */
app.get('/token' ,function(req, res){
    let tokeninsert = req.query.tokenid;
    Tocken.find({ "token" : tokeninsert})
          .exec((err, tokens) =>{
              if (err) {
                  return res.status(400).json({
                      ok: false,
                      err
                  });
              }
              res.json({
                  ok: true,
                  tokens
              })
          })
});

/* Method GET */
/*
app.get('/tocken',function(req, res){    
    Tocken.find({  })
        .exec((err, tocken) => {
            if ( err ) {
                return res.status(400).json({
                   err
               });
           }

           Tocken.count({}, (err, conteo) => {
                res.json({
                    ok: true,   
                    tocken,
                    total : conteo
                });
            });
    })
});
*/
/* Method POST */

    app.post('/tocken', function (req, res){

        let body = req.body;
        let now = new Date();        
        let tokenalpha = rand_code("ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789",20);     

        let token = new Tocken({
            code : body.code,
            idplan: body.idplan,
            token: tokenalpha,
            state: body.state,
            create_at: now,
            update_at: now,
            delete_at: body.delete_at,
            iduser: body.iduser         
        });

        if (validvepan === body.serialNumber) {
            token.save((err, tokenDB) => {
                if( err ) {
                    return res.status(400).json({
                        err
                    });
                }
    
                res.json({
                    ok : true,
                    token: tokenDB
                })
            })
        }else{
            res.json({
                ok: false
            })
        }        
    });



/* Method PUT */

/* Method DELETE */

function rand_code(chars, lon){
    code = "";
    for (x=0; x < lon; x++)
    {
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }
        return code;
    }

module.exports = app;