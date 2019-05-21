const jwt  = require('jsonwebtoken');


const {jwtOptions, jwtPrivetKey} = require('../config/server-conf');

const Jwt = {
    sign: (data, secret = jwtPrivetKey, options = jwtOptions) => jwt.sign(data, secret, options),
    verify: (token, secret = jwtPrivetKey) => jwt.verify(token, secret),
};

function verify(req) {
    const {query, body, headers} = req;
    let token = (
        (query && query.token) 
        || (body && body['access-token'])
        || (body && body['token'])
        || headers['x-access-token'] 
        || headers['autorization'])
    if (!token) {
        return false;
    }
    try {
        token = token.replace('Bearer ', '').replace('bearer-', '');  
        return Jwt.verify(token);  
    } catch (e) {
        console.warn(e);
        return false;
    }
}

exports.verifyUser = verify;

exports.Jwt = Jwt;
