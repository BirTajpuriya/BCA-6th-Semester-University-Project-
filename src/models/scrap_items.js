const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session=require('express-session');
const cookieParser=require('cookie-parser');

// (name,image,price,description,qty,category_id,status,section,seller_name,user_id)
const ScrapSchema = new mongoose.Schema({
  name:String,
  price:Number,
  description:String,
  qty:String,
  category:String,
  image:String,
  seller_name: String,
  status:{
    type:String,
    default:0
  },
  scrap_category: { type: Schema.Types.ObjectId, ref: "Scrap_category" }

//   seller_name:{s
//       type:String
//   }

});


const Scrap = new mongoose.model("Scrap_item", ScrapSchema);
module.exports = Scrap;
