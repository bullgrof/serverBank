const jwt = require('jsonwebtoken');


module.exports = class JwToken {

    static seed= 'lay-down-your-souls-to-the-gods-rock';
    static expiration = '30d';

    constructor (){}

    static getJwtToken(payload){
        
        return jwt.sign({
            user: payload
        },this.seed, { expiresIn: this.expiration });
    }


    static checkToken( userToken ){
        return new Promise ((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded)=>{
                if(err){
                    reject();
                }else{
                    resolve( decoded );
                }
            });
        });
    }
}

