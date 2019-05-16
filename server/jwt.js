const jwt  = require('jsonwebtoken');


const {jwtOptions, jwtPrivetKey} = require('../config/server-conf');

const Jwt = {
    sign: (data, secret = jwtPrivetKey, options = jwtOptions) => jwt.sign(data, secret, options),
    verify: (token, secret = jwtPrivetKey) => jwt.verify(token, secret),
};

function verify(req) {
    const {query, body, header} = req;
    console.log(query, body, header);
    const token = query.token || body['access-token'] || header['access-token']
    if (!token) {
        return false;
    }
   
    return Jwt.verify(token);

    
    
}

exports.verifyUser = verify;

exports.Jwt = Jwt;
