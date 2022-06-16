const express = require("express");
const bcrypt = require("bcrypt");
// const Product = require("../models/product");
const Scrap = require("../models/scrap_items");
const scrap_category = require("../models/scrapCategory");
const Notification=require("../models/notification");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth=require('../middleware/auth');


const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/scrap/index", async (req, res) => {
  try {
    const result = await Scrap.find();
    // console.log(result);
    res.render("scrap_user/index", {
      data: result,
      scrap_user: req.cookies.name,
    });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/scrap/category", async (req, res) => {
  try {
    const result = await scrap_category.find();
    // console.log(result);
    res.render("scrap_user/scrap_category", {
      data: result,
      scrap_user: req.cookies.name,
    });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/addscrap", async (req, res) => {
  try {
    const result = await scrap_category.find();
    res.render("scrap_user/addscrap", {
      scrap_user: req.cookies.name,
      data: result,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/addscrap", upload, async (req, res) => {
  let seller=req.cookies.name;

  try {
    const imagefile = req.file.filename;
    const Productadd = new Scrap({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      qty: req.body.qty,
      category: req.body.category,
      image: imagefile,
      seller_name:seller
      //   seller_name: req.body.seller_name
    });

    await Productadd.save();
    // console.log(req.body.name);
    res.redirect("/scrap/index");
    // res.status(201).send("product added");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/scrapshop",async (req, res) => {
  try {
    if(!req.cookies.jwt){
      const result = await Scrap.find({status:1}).populate("scrap_category");
      res.render("scrapshop", {
        data: result
        
      });
    }
    else{
      const result = await Scrap.find({status:1}).populate("scrap_category");
      res.render("scrapshop", {
        data: result,
        logged:true

      });
    }
      
    
  } catch (e) {
    console.log("some error");
  }
});


router.get("/scrapdetail/:id", async (req, res) => {
  try {
    const proId = req.params.id;
    // console.log(proId);
    const result = await Scrap.findById({_id:proId}).populate("scrap_category");
    res.render("scrapdetail", {
      data:result
    });
  } catch (e) {
    console.log("some error");
  }
});


//delete scrap routes
router.get("/delete/scrap/:id",async(req,res)=>{
  try{
    let id=req.params.id;
    const deleteItem=await Scrap.deleteOne({_id:id});
    res.redirect("/scrap/index")
  }catch(e){console.log(e);

  }
})

router.get('/scrap/notification/delete/:id',async(req,res)=>{
  try{
    const id=req.params.id;
    const deleteData=await Notification.deleteOne({_id:id});
    res.redirect('/scrap/notification')
  }catch(e){
    console.log(e);
  }
  })

router.get("/edit/scrap/:id",async(req,res)=>{
  try{
    let _id=req.params.id;
    const result=await Scrap.findOne({_id});
    res.render("scrap_user/editScrap",{scrap_user:req.cookies.name,data:result})
  }catch(e){console.log(e);

  }
})

router.post("/update/scrap/:id",async(req,res)=>{
  try{
    let _id=req.params.id;
    console.log(req.body);
    const result=await Scrap.findByIdAndUpdate(_id,req.body,{useFindAndModify:false});
    console.log(result);
    if(!result){
res.send("fail to send data")
    }
    else{

      res.redirect("/scrap/index")
    }
  }catch(e){console.log(e);

  }
})


module.exports = router;
