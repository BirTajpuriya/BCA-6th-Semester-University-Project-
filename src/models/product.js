const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// (name,image,price,description,qty,category_id,status,section,seller_name,user_id)
const ProductSchema = new mongoose.Schema({
  product_name: String,
  price: Number,
  description: String,
  qty: String,
  category: String,
  image: String,
  seller_name: String,
  status:{type:Number,
    default:0
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" }
});

const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;
