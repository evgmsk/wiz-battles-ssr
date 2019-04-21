/**
 * project new-wiz-bat
 */
const jwt   = require('jsonwebtoken');
const  { jwtOption, secret } = require('../../config/server-conf');

const options = (expiresIn = 900, algorithm = "RS256") => {
    return {...jwtOption, expiresIn, algorithm}
};

module.exports = {
    sign: (payload, options = options()) => {
        return jwt.sign(payload, secret, options);
    },
    verify: (token, options = options()) => {
        try{
            return jwt.verify(token, secret, options);
        }catch (err){
            return false;
        }
    },
    /*decode: (token) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }*/
};
