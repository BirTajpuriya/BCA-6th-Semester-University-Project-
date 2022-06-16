const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/admin_register");
const product = require("../models/product");
const Category=require("../models/category");
const subscription=require("../models/subscription");
const Scrap_category=require("../models/scrapCategory");
const scrap = require("../models/scrap_items");
const router = express.Router();
const jwt = require("jsonwebtoken");

const sessionChecker = async(req, res, next) => {
  try{
    if (req.cookies.admin="") {
      res.render("admin/login");

  
  
    } else {
      res.redirect("/admin/index")
    }
    next();
  }
  catch(e){
    console.log(e);
  }
  
};


// admin artist product routes
router.get("/admin/index", async (req, res) => {
  try {
    const result = await product.find();
    // console.log(result);
    res.render("admin/index", { data: result, name: req.cookies.admin });
  } catch (e) {
    console.log("some error");
  }
});


// admin scrap routes
router.get("/admin/scrapItem", async (req, res) => {
  try {
    const result = await scrap.find();
    // console.log(result);
    res.render("admin/scrapItem", { data: result, name: req.cookies.admin });
  } catch (e) {
    console.log("some error");
  }
});

// for admin side subscription
router.get("/admin/subscription",async(req,res)=>{
  try{
const result=await subscription.find();
console.log(result);
res.render("admin/subscription",{
  data:result,
  name:req.cookies.admin
})
  }catch(e){
    console.log(e);
  }
})

router.get("/status/:id/:status", async (req, res) => {
  try {
    let _id = req.params.id;
    let status = req.params.status;
    // console.log(req.body);
    const result = await product.findByIdAndUpdate({ _id }, { status: status });
    console.log(result);
    if (!result) {
      res.send("fail to send data");
    } else {
      res.redirect("/admin/index");
    }
  } catch (e) {
    console.log(e);
  }
});


//status for scrap products
router.get("/scrap/status/:id/:status", async (req, res) => {
  try {
    let _id = req.params.id;
    let status = req.params.status;
    // console.log(req.body);
    const result = await scrap.findByIdAndUpdate({ _id }, { status: status });
    console.log(result);
    if (!result) {
      res.send("fail to send data");
    } else {
      res.redirect("/admin/scrapItem");
    }
  } catch (e) {
    console.log(e);
  }
});


// delete the art category
router.get("/deletecategory/:id",async(req,res)=>{
  try{
    let id=req.params.id;
    const deleteItem=await Category.deleteOne({_id:id});
    res.redirect("/admin/category")
  }catch(e){console.log(e);

  }
})

// delete routes for delete scrap category
router.get("/scrap/deletecategory/:id",async(req,res)=>{
  try{
const id=req.params.id;
const deletecat=await Scrap_category.deleteOne({_id:id});
res.redirect("/admin/scrap_category")
  }catch(e){
    console.log(e);
  }
})
// router.get("/admin/index", sessionChecker, (req, res) => {
//   res.render("admin/login");
// });

router.get("/admin",  (req, res) => {
  res.render("admin/login");
});

router.get("/admin/login", (req, res) => {
  res.render("admin/login");
});

router.post("/admin/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Register.findOne({ email });

    const admin=user.name;
    res.cookie("admin", admin, {
      httpOnly: true
    });





    // req.session.name = user.name;
    // console.log(`the user is ${req.cookies.admin}`);
    if (!user) {
      res.render("admin/login",{
        msg:"You entered wrong details !" 
      })
      // console.log("fail to access");
    } else {
      const result = await product.find();
      res.redirect("/admin/index")
      // res.render("admin/index", { data: result, name: req.cookies.admin});
    }
  } catch (e) {
    res.render("admin/login",{
      msg:"You entered wrong details !" 
    })
    // res.status(401).send("failed to open the page !");
  }
});


// delete subscription
router.get("/deletesubs/:id",async(req,res)=>{
  try{
    let id=req.params.id;
    const deleteItem=await subscription.deleteOne({_id:id});
    res.redirect("/admin/subscription")
  }catch(e){console.log(e);

  }
})
router.get("/logoutadmin",async (req, res) => {
  try{
    res.clearCookie("admin");
    res.redirect("/admin/login");


  }
  catch(e){
    console.log(e);
  }



  // if (req.session.name) {
  //   // res.clearCookie("user_id");
  //   const destroy = req.session.destroy();
  //   if (destroy) {
  //     res.redirect("/admin/login");
  //   } else {
  //     res.send("unable to log out");
  //   }
  // } else {
  //   res.send("unable to Log Out");
  // }
});

module.exports = router;
