const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/register");
const Product = require("../models/product");
const category = require("../models/category");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const session = require("express-session");
const auth = require("../middleware/auth");
const { route } = require("./scrapRoutes");
const controller=require("../controllers/login")
// router.use(
//   session({
//     secret: "session_secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );



// const cookieParser = require("cookie-parser");

//landing page fetching data
router.get("/index", async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      const result = await Product.find({status:1}).populate("category").limit(4);
      res.render("index", {
        data: result,
      });
    } else {
      const result = await Product.find({status:1}).populate("category").limit(4);
      res.render("index", {
        data: result,
        logged: true
      });
    }

    //  res.render('index');
    // return;
  } catch (e) {
    console.log("some error");
  }
});

router.get("/artdetail/:id", async (req, res) => {
  try {
    const proId = req.params.id;
    // console.log(proId);
    const result = await Product.findById({ proId }).populate("category");
    res.render("artdetail", {
     data:result,
    });
  } catch (e) {
    console.log("some error");
  }
});

router.get("/artshop", async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      const result = await Product.find({status:1}).populate("category");
      res.render("artshop", {
        data: result
      });
    } else {
      const result = await Product.find({status:1}).populate("category");
      res.render("artshop", {
        data: result,
        logged: true
      });
    }
  } catch (e) {
    console.log("some error");
  }
});

router.get("/login", (req, res) => {
  res.render("login/login");
});

//artshop

// new login route
router.post("/login",controller.login);


router.get('/test',auth.auth,(req,res)=>{
  console.log(`this is test cookie:- ${req.cookies.jwt}`);
  res.render("test");
})



router.get("/register", (req, res) => {
  res.render("login/register");
});
router.post("/register", async (req, res) => {
  try {
    const registeruser = new Register({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    // const token = await registeruser.generateAuthtoken();
    const registered = await registeruser.save();
    const token = await registeruser.generateAuthtoken();
    res.status(201).render("login/register",{
      msg:"You have successfully registered !"
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/logout",auth.auth,async(req,res)=>{
  try{
    req.user.tokens=req.user.tokens.filter((currElement)=>{
      return currElement.token!=req.token
    })
res.clearCookie("jwt");
res.clearCookie("name");

await req.user.save();
res.render("login/login");
  }
  catch(e){
    console.log(e);
  }
})


// router.get("/signout",async (req, res) => {
//   try {
//     req.session.destroy();
//     res.redirect("/index");
//   } catch (e) {
//     console.log(e);
//   }
// });
router.get("/subscription", (req, res) => {
  res.render("subscription/index");
});







module.exports = router;
