const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../models/product");
const register=require("../models/register")
const Subscription = require("../models/subscription");
// const Category = require("../models/category");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer=require('multer')
const path=require('path');
const fs=require('fs');
const alert=require("alert");
const Category = require("../models/category");
const { Script } = require("vm");


const storage = multer.diskStorage({
  destination:"./public/uploads/"
  ,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single('file');


const subscriptionChecker = async (req, res, next) => {
  let username = req.cookies.name;
  console.log(username);
  const result = await Subscription.findOne({ username });
  if (!result) {
    alert("First of all you have to take subscription !");
    res.redirect("/index");
  } else {
    next();
  }
};


//for single page product
router.get("/detail/:id",async(req,res)=>{
 try{
   
   let id=req.params.id;
   let result=await Product.findById(id);
   console.log(result);
   res.render("artdetail",{data:result})
 }catch(e){
   console.log('error !');
 }
});

router.get("/art", subscriptionChecker, async (req, res) => {
  try {
    res.render("art_user/index");
  } catch (e) {
    console.log("some error");
  }
});
router.get("/art/index", subscriptionChecker, async (req, res) => {
  try {
    const name=req.cookies.name;
    const findData = await Product.find({seller_name:name}).populate('category');
    res.render("art_user/index", {
      data: findData,
      art_user: name
    });
  } catch (e) {
    console.log("some error");
  }
});


//this is for category join
router.get("/addproduct", async(req, res) => {
try{
  const result= await Category.find();
    res.render("art_user/addProduct", { art_user: req.cookies.name,data:result });
}
catch(e){
  console.log(e);
}
 



});
router.post("/addpro",upload,async (req, res) => {
 let imagefile=req.file.filename;
 let seller=req.cookies.name;
  try {
    const Productadd = new Product({
      product_name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      qty: req.body.qty,
      category: req.body.category,
      image:imagefile,
      seller_name:seller
      });

    await Productadd.save();
    // console.log(req.body.name);
    res.redirect("/art/index");
    // res.status(201).send("product added");
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get("/delete/:id",async(req,res)=>{
  try{
    let id=req.params.id;
    const deleteItem=await Product.deleteOne({_id:id});
    res.redirect("/art/index")
  }catch(e){console.log(e);

  }
})

router.get("/edit/:id",async(req,res)=>{
  try{
    let _id=req.params.id;
    const result=await Product.findOne({_id});
    res.render("art_user/editProduct",{art_user:req.cookies.name,data:result})
  }catch(e){console.log(e);

  }
})

router.post("/update/product/:id",async(req,res)=>{
  try{
    let _id=req.params.id;
    console.log(req.body);
    const result=await Product.findByIdAndUpdate(_id,req.body,{useFindAndModify:false});
    console.log(result);
    if(!result){
res.send("fail to send data")
    }
    else{

      res.redirect("/art/index")
    }
  }catch(e){console.log(e);

  }
})



module.exports = router;
