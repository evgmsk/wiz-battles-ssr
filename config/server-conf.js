/**
 *  project WizBattle
 */
exports.SC = {
    protocol: 'http://',
    host: 'localhost',
    port: 3001,
};

exports.secret = 'mysecret';

exports.jwtOptions = {
    issuer:  'wiz-battles',
    subject:  'wiz-batles-token',
    audience: "Client_Identity", // this should be provided by client
};

exports.jwtPrivetKey = 'saefdht#segfs$sfse';

const dbPass = 'UjsjBSvFjglxNPBJ';

exports.dbConnect = `mongodb+srv://evgmsk:${dbPass}@cluster0-io7pm.mongodb.net/my-base?retryWrites=true`;

/*
export const signOptions = {j
    issuer:  jwtOptions.issuer,
    subject:  jwtOptions.subject,
    expiresIn:  jwtOptions.expiresIn,
    audience: jwtOptions.audience,
    algorithm:  jwtOptions.algorithm
};

export const verifyOptions = {
    issuer:  jwtOptions.issuer,
    subject:  jwtOptions.subject,
    expiresIn:  jwtOptions.expiresIn,
    audience: jwtOptions.audience,
    algorithm:  jwtOptions.algorithm
};*/
