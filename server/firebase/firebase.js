const admin = require("firebase-admin");

const serviceAccount = require("../../secret-data/wiz-base-firebase-adminsdk-bndxh-ee1e011d6d.json");

const Admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wiz-base.firebaseio.com"
});

export const db = Admin.firestore();

export const usersRef = db.collection('users');

export const auth = Admin.auth();

export const storage = Admin.storage();

export default Admin;
