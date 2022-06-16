const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session=require('express-session');
const cookieParser=require('cookie-parser');

// (name,image,price,description,qty,category_id,status,section,seller_name,user_id)
const ScrapcategorySchema = new mongoose.Schema({
    name:String
});


const Scrap_category = new mongoose.model("Scrap_category",ScrapcategorySchema);
module.exports = Scrap_category;
