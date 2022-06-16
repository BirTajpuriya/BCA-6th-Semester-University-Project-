const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/register");
const Product = require("../models/product");
const category = require("../models/category");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const session = require("express-session");
const auth = require("../middleware/auth");


const login=async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await Register.findByCredentials(email, password);
      const token = await user.generateAuthtoken();
      console.log(`Login token ${token}`);
  
      const username=user.name;
      res.cookie("jwt", token, {
        httpOnly: true
      });
      res.cookie("name", username, {
        httpOnly: true
      });
  
  
  
      if (!user) {
        console.log("fail to load");
      } else {
        // req.cookies.username = user.name;
        const result = await Product.find().populate("category").limit(4);
        res.render("index", {
          data: result,
          logged: true
          // art_user: req.session.username,
        });
      }
    } catch (e) {
      res.render("login/login", {
        msg: "fail to open page",
      });
  
      // res.status(401).send("failed to open the page !");
    }
  }

  module.exports={login}