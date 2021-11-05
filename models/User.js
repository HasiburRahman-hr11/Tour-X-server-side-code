const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: String,
    email: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const User = model('User', userSchema);
module.exports = User;