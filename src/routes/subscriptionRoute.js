const express = require("express");
const bcrypt = require("bcrypt");
const Subscription = require("../models/subscription");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//fetch all category
router.get("/subs", (req, res) => {
  res.render('subscription/index',{art_user:req.cookies.name,
    logged:true
  });
});

router.post("/addsubscription", async (req, res) => {

  let art_user=req.cookies.name;
  let duration= "Free 3 months"
  try {
    const subscriptionAdd = new Subscription({
      username: art_user,
      duration:duration
    });
    await subscriptionAdd.save();
    // console.log(req.body.name);
    // res.send('success');
    res.render("subscription/index",{
      art_user:req.cookies.name,logged:true,
      msg:"you have taken subscription !"
    })
    // res.redirect('/art/index');
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/addsubscription_2", async (req, res) => {
  let art_user=req.cookies.name;
  let duration="6 months"
  try {
    const subscriptionAdd = new Subscription({
      username: art_user,
      logged:true,
      duration:duration
    });
    await subscriptionAdd.save();
    // console.log(req.body.name);
    // res.send('success');
    res.render("subscription/index",{
      art_user:req.cookies.name,
      msg:"you have taken subscription !"
    })
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/addsubscription_3", async (req, res) => {
  let art_user=req.cookies.name;
  let duration="1 year"
  try {
    const subscriptionAdd = new Subscription({
      username: art_user,
      logged:true,
      duration:duration
    });
    await subscriptionAdd.save();
    // console.log(req.body.name);
    // res.send('success');
    res.render("subscription/index",{
      art_user:req.cookies.name,
      msg:"you have taken subscription !"
    })
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
