const express = require('express');
const Token = require('../server/classes/tokenj') ;

module.exports = verifyToken = (req, res, next)=>{
    const userToken = req.get('x-token') || '';
    Token.comprobeToken(userToken)
        .then(decoded=>{
            req.user = decoded.user;
            next();
        })
        .catch((err)=>{
            res.json({
                ok:false,
                message: 'Faltan parametros'
            })
        })
}