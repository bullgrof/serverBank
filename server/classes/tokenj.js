const  jwt  = require('jsonwebtoken');

class Token{


static seed = '2xD8C2F6D978CA21712B5F6DE36C9D31FA8E96A4FA5D8FF8B0188DFB9E7C171BBxx';

static expiration = '15m';

constructor(){

}

static getJwtToken(payload){

    return jwt.sign({
        user: payload
    }, this.seed, { expiresIn : this.expiration })
}

static comprobeToken(userToken){
    //console.log(' + + + +  + + + + + + +  + + + + PASO A COMPROBAR TOKEN + + + + + +  + ++ ',userToken)
    return new  Promise((resolve, reject)=>{
        jwt.verify(userToken,this.seed, (err, decoded)=>{
            if (err) {
                //console.log('ERROR RECHAZADO TOKEN',err)
                reject();
            }else{
                //console.log('paso al resolve', decoded)
                resolve(decoded);
            }
        })
    })

    
}

}

module.exports = Token;