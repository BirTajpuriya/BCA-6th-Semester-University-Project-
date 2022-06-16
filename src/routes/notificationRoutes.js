const express = require("express");
const bcrypt = require("bcrypt");
const Notification = require("../models/notification");
const Category = require("../models/category");
const product = require("../models/product");
const scrap = require("../models/scrap_items");

const Scrap_category = require("../models/scrapCategory");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

router.get("/notification/:id", async (req, res) => {
  try{
    if(req.cookies.name){
      let id = req.params.id;
    res.render("notification/register", {
      uid: id,
      logged:true
    });
    }else{
      let id = req.params.id;
    res.render("notification/register", {
      uid: id
    });
    }
    
  }catch(e){
    console.log(e);
  }
 
});

router.post("/notification/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result=await product.findOne({_id:id});
    let data=result.product_name;
    console.log(data);
    const register = new Notification({
      sender: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      receiver: id,
      product:data
    });

    // const token = await registeruser.generateAuthtoken();
    const regis = await register.save();
    res.redirect("/index");
  } catch (e) {
    console.log(e);
  }
});

//scrap notification
router.get("/scrap/notification/:id", async (req, res) => {
  try{
    if(req.cookies.name){
      let id = req.params.id;
    res.render("notification/scrap_register", {
      uid: id,
      logged:true
    });
    }else{
      let id = req.params.id;
    res.render("notification/scrap_register", {
      uid: id
    });
    }
    
  }catch(e){
    console.log(e);
  }
 
});


router.post("/scrap/notification/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result=await scrap.findOne({_id:id});
    let data=result.name;
    console.log(data);
    const register = new Notification({
      sender: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      receiver: id,
      product:data
    });

    // const token = await registeruser.generateAuthtoken();
    const regis = await register.save();
    res.redirect("/index");
  } catch (e) {
    console.log(e);
  }
});


router.get('/notification/delete/:id',async(req,res)=>{
try{
  const id=req.params.id;
  const deleteData=await Notification.deleteOne({_id:id});
  res.redirect('/art/notification')
}catch(e){
  console.log(e);
}
})



module.exports = router;
