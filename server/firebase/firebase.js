/**
 * project new-wiz-bat
 */

const admin = require("firebase-admin");

console.log('connect firebase');

const serviceAccount = require("./wiz-base-firebase-adminsdk-bndxh-ee1e011d6d.json");

export const Admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wiz-base.firebaseio.com"
});

export const db = Admin.firestore();

export const auth = Admin.auth();

export const storage = Admin.storage();
