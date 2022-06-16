const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session=require('express-session');
const cookieParser=require('cookie-parser');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});


//for generating auth token
userSchema.methods.generateAuthtoken=async function(){
  try{
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY);
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
  }
catch(e){
  console.log('failed to create token');
}
}



userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Register.findOne({ email });
  // req.session.username=user.name;
  // console.log(req.session.username);
  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password not matched !");
  }
  return user;
};

//hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // console.log(`curr pass is ${this.password}`);
  // this.password=await bcrypt.hash(this.password,10);
  // console.log(`curr pass is ${this.password}`);

  // this.cpassword=undefined;

  next();
});

const Register = new mongoose.model("Register", userSchema);
module.exports = Register;
