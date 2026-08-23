const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id : {
        type:Number,
        required : true
    },
    user_name : {
        type : String,
        required : true,
        length:10
    },
    name : {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);
