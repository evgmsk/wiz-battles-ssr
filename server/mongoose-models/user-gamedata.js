/**
 * project new-wiz-bat
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserData = new Schema({
    nickName:{
        type: String
    },
    level:{
        type: Number
    },
    experience: {
        type: Number
    },
    health:{
        type: Number
    },
    items:{
        type: Schema.Types.Mixed
    },
    taskResolved:{
        type: Number
    },
    taskFailed: {
        type: Number
    },
    image: {
        type: String
    },
    currentLocation: {
        type: Schema.Types.Mixed
    }
},
{
    timestamps: true
});

const Users = mongoose.model('Users', User);
module.exports = Users;
