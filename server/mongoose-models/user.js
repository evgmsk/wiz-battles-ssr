import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
    },
    password:{
        type:String,
    },
    email:{
        type:String, index: { unique: true }
    },
    vk_id:{
        type:String
    },
    fb_id:{
        type:String
    },
    inst_id:{
        type:String
    },
    game_data:{
        type: Schema.Types.ObjectId, ref: 'UserData'
    }
},
{
    timestamps: true
});


UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(passwordToCheck, cb) {
    bcrypt.compare(passwordToCheck, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);
