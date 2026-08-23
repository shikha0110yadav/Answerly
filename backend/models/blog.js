const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blog_id : {
        type:Number,
        required:true
    },
    blog_title : {
        type : String,
        required : true
    },
    blog : {
        type:String,
        required:true
    },
    posted_by : {
        type:String,
        required:true
    },
    posted_by_id : {
        type:Number,
        required:true
    },
    likes : {
        type:Number,
        default : 0
    },
    time : {
        type : Date,
        required:true
    },
    comments : [
        {   
            comment_id : {
                type:Number,
                required:true 
            },
            message : {
                type:String
            },
            by : {
                type:String
            },
            by_id : {
                type:Number,
                required:true
            },
            time:{
                type:Date
            }
        }
    ], 
    likes_by : [
        {
            liked_by_id : {
                type:Number,
                required:true 
            },
            value:{
                type:Number,
                required:true
            }
        }
    ]
})

module.exports = mongoose.model('Blog', blogSchema);
