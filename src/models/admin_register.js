const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
 
});


// adminSchema.statics.findByCredentials = async (email, password) => {
//   const user = await AdminRegister.findOne({ email });
//   if (!user) {
//     throw new Error("unable to login");
//   }
//   console.log('hello');
//   return user;
// };


const AdminRegister = new mongoose.model("Adminregister", adminSchema);
module.exports = AdminRegister;
