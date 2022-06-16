const express = require("express");
const bcrypt = require("bcrypt");
const Category = require("../models/category");
const product = require("../models/product");
const scrap = require("../models/scrap_items");
const Notification = require("../models/notification");
const Scrap_category = require("../models/scrapCategory");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//fetch all Art_category
router.get("/admin/category", async (req, res) => {
  try {
    const result = await Category.find();
    // console.log(result);
    res.render("admin/category", { data: result, name: req.cookies.admin });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/art/notification", async (req, res) => {
  try {
    // const result = [];
    const user = req.cookies.name;
    // const find=await product.find({$or:[{seller_name:user}]});
    const find = await product.find({ seller_name: user }).select({ _id: 1 });
    // find.forEach((data) => {
    //   result.push(data._id);
    //   // console.log(data);
    // });

    // console.log(result);

let id=[]
    find.forEach((data)=>{
       id.push(data._id);
      
    })
    // console.log(id);
    const result = await Notification.find({ receiver: id });
      console.log(` data that used notification ${result}`);
      res.render("art_user/notification", {
        data: result,
        art_user: user
      });

    // const data=await find.forEach(console.log());

    // <% if(data.length){
    // for(var i=0;i<data.length; i++) {%>
    // let data =new Array();
    // if(find._id.length){
    //   for(var i=0;i<find._id.length;i++){
    //     data.push(find._id[i]);

    //   }
    // }
    // let data=new Array()
    //         find.forEach((element) => {
    //           data.push(element._id);

    //         });
    // console.log(data);

    // console.log(find);
    // const item=find._id;
    // console.log(item);
    // data[...data,find._id];
    // data.slice(data.length,0,find._id);
    // data.push([find._id]);
    // console.log(item);
    // console.log(data);

    // const id=new Array(find._id);
    // const id=new Array(await find.forEach());

    // const id=new Array(data);
    // console.log(data);
    // const result=await Notification.find({$or:[{receiver:id}]});
    // const result=await Notification.find({receiver:id});
    // console.log(` data that used notification ${result}`);
    // res.render('art_user/notification',{
    // data:result,
    //   art_user:user
    // })
  } catch (e) {
    console.log("error occur bhayo !");
  }
});

// scrap notification
router.get("/scrap/notification", async (req, res) => {
  try {
    const user = req.cookies.name;
    const find = await scrap.find({ seller_name: user }).select({ _id: 1 });


    let id=[];
    find.forEach((data)=>{
       id.push(data._id);
      
    })
    // console.log(id);
    const result = await Notification.find({ receiver: id });
      console.log(` data that used notification ${result}`);
      res.render("scrap_user/notification", {
        data: result,
        scrap_user: user
      });



    // const id = find._id;
    // console.log(`this is id ${id}`);
    // const result = await Notification.find({ receiver: id });
    // console.log(` data that used notification ${result}`);
    // res.render("scrap_user/notification", {
    //   data: result,
    //   scrap_user: user,
    // });
  } catch (e) {
    console.log("error occur bhayo !");
  }
});

router.get("/art/category", async (req, res) => {
  const user = req.cookies.name;

  try {
    const result = await Category.find();
    res.render("art_user/category", { data: result, art_user: user });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/addcategory", (req, res) => {
  res.render("admin/addCategory", { name: req.cookies.name });
});

router.post("/addcategory", async (req, res) => {
  try {
    const Categoryadd = new Category({
      name: req.body.name,
    });
    await Categoryadd.save();
    res.redirect("/admin/category");
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***************** Scrap Routes ***************************************
router.get("/admin/scrap_category", async (req, res) => {
  try {
    const result = await Scrap_category.find();
    res.render("admin/scrap_category", {
      data: result,
      name: req.cookies.admin
    });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/addscrapcat", (req, res) => {
  res.render("admin/add_scrapcategory", { name: req.cookies.admin });
});

router.post("/addscrapcat", async (req, res) => {
  try {
    const Categoryadd = new Scrap_category({
      name: req.body.name,
    });
    await Categoryadd.save();
    console.log(req.body.name);
    res.redirect("/admin/scrap_category");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
