require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
require("./db/conn");
const Register = require("./models/register");
const admin_register=require("./models/admin_register")
// const hbs = require("hbs");
const ejs=require('ejs');
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const multer=require('multer')

const session = require('express-session');



//latest one
// const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: true 
// }));

app.use(cookieParser());



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.use(cookieParser());
// app.use(
//   session({
//     // key: 'user_id',
//     secret: "randomkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 600000,
//     },
//   })
// );

// app.use((req, res, next) => {
//   if (req.session.user && req.cookies.user_id) {
//     res.redirect("/admin");
//   }
//   next();
// });

//session checker

// importing routes
const user = require("./routes/userRoute");
const admin = require("./routes/adminRoute");
const product=require("./routes/productRoute");
const category=require("./routes/categoryRoute");
const manageuser=require("./routes/manageUserRoute")
const Subscription=require("./routes/subscriptionRoute")
const Scrap_category=require("./routes/scrapRoutes")
const subscription=require("./routes/notificationRoutes")
const flash = require("express-flash");

//setting view engine
const staticPath = path.join(__dirname, "./public");
const templatePath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
const adminPath = path.join(__dirname, "./templates/admin");
app.set("view engine", "ejs");
app.set("views", templatePath);
// hbs.registerPartials(partialPath);
// hbs.registerPartials(adminPath);
// console.log(SECRET_KEY);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));

// loads and register routers
app.use("", user);
app.use("", admin);
app.use("", product);
app.use("", category);
app.use("", manageuser);
app.use("", Subscription);
app.use("", Scrap_category);
app.use("",subscription)

app.get("/artdetail", (req, res) => {
  res.render("artdetail");
});

app.listen(port, () => {
  console.log(`Server running in  http://localhost:${port}/index`);
});
