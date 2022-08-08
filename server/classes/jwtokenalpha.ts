import jwt from 'jsonwebtoken';
import { reject } from 'bcrypt/promises';


export default class Token {

    private static seed: string = 'lay-down-your-souls-to-the-gods-rock';
    private static expiration: string = '30d';

    constructor (){}

    static getJwtToken(payload: any): string{
        
        return jwt.sign({
            user: payload
        },this.seed, { expiresIn: this.expiration });
    }


    static checkToken( userToken: string ){
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






