const express = require("express");
const bcrypt = require("bcrypt");
const register = require("../models/register");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//fetch all category
router.get('/admin/manageuser',async(req,res)=>{
    try{
      const result=await register.find();
    // console.log(result);
    res.render('admin/viewUsers',{data:result, name:req.cookies.admin})
    }catch(e){
      console.log("some error");
    }
  })

  // delete routes for admin viewUseres
  router.get("/deleteusers/:id",async(req,res)=>{
    try{
      let id=req.params.id;
      const deleteItem=await register.deleteOne({_id:id});
      res.redirect("/admin/manageuser")
    }catch(e){console.log(e);
  
    }
  })



  module.exports=router;