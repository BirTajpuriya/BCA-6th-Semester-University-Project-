const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session=require('express-session');
const cookieParser=require('cookie-parser');

// (name,image,price,description,qty,category_id,status,section,seller_name,user_id)
const CategorySchema = new mongoose.Schema({
    name:String
    // cat_id:{type:Schema.Types.ObjectId,ref:"Product"}
});


const Category = new mongoose.model("Category",CategorySchema);
module.exports = Category;
