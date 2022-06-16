const { verify } = require("crypto");
const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);

    const user=await Register.findOne({_id:verifyToken._id});
    console.log(user.name);

    req.token=token;
    req.user=user;
    next();
   
  } catch (e) {
      res.redirect('/login')
    //   res.send("unable to login");
    // res.status(401).send(e);
  }
};

const auth2 = async (req, res, next) => {
  try {
    const username = req.cookies.name;
    const verifyToken = jwt.verify(username, process.env.SECRET_KEY);
    console.log(verifyToken);
    next();
   
  } catch (e) {
      res.redirect('/login')
    //   res.send("unable to login");
    // res.status(401).send(e);
  }
};


//artuser middleware
const check=async(req,res,next)=>{
    try{
        if(!req.cookies.jwt){
            const result = await Scrap.find().populate("scrap_category");
            res.render("scrapshop", {
              data: result
              
            });
          }
        next();
    }
    catch(e){
        res.redirect('/scrapshop')
        // console.log(`error occur hai !`);
    }
}

module.exports = {auth,auth2,check};
