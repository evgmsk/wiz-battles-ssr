import Jwt from '../jwt';
import {usersRef} from '../firebase/firebase';
//import {updateUserWithSaga} from '../../shared/store/actions/userActions'

module.exports = function verifyUser(req, res, next) {
    const user = Jwt.verifyUser(req);
    console.log(user);
    if (user) {
        req.userRef = usersRef.doc(user.email);
        req.user = user;
    }
        

    if (!(req.method === 'GET' && !/^\/game/.test(req.url))) {
       //res.json(updateUserWithSaga({userName: '', token: null}));
    }  
    next();
}