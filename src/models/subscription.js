const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session=require('express-session');
const cookieParser=require('cookie-parser');

// (name,image,price,description,qty,category_id,status,section,seller_name,user_id)
const SubscriptionSchema = new mongoose.Schema({
    username:String,
    duration:String,
    started:{
        type:Date,
        default:()=>Date.now()
    }
});


const Subscription = new mongoose.model("Subscription",SubscriptionSchema);
module.exports = Subscription;
