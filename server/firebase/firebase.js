const admin = require("firebase-admin");

const serviceAccount = require("../../secret-data/wiz-base-firebase-adminsdk-s578v-cf4b4f1d6b.json");

const Admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wiz-base.firebaseio.com"
});

export const db = Admin.firestore();

export const usersRef = db.collection('users');

export const auth = Admin.auth();

export const storage = Admin.storage();

export default Admin;
