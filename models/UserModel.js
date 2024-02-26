//1)
const mongoose = require("mongoose");
const valid = require("validator");
const config = require("config");

//create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return valid.isEmail(val);
      },
      message: "{VALUE} is not valid email",
    },
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  address:{
    type: String,
    required: true,
  },
  phoneNumber:{
    type : String,
    required: true,
  },
  month1:{
    type: String,
    required:true
  },
  month2:{
    type: String,
    required:true
  },
  month3:{
    type: String,
    required:true
  },
  month4:{
    type: String,
    required:true
  }
});
userSchema.virtual('packages', {
    ref: 'Package',
    localField: 'user',
    foreignField: '_id',
  });

//create model
exports.User = mongoose.model("User", userSchema);



