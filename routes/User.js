const express=require("express");
const router=express.Router();
const validator=require("../middlewares/UserMWValidator");
const bcrypt=require("bcrypt");
const { User } = require("../models/UserModel");

router.post("/", validator, async (req, res) => {
  try {
    //check already
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User already registered");

    //create new user to be added to DB
    let salt = await bcrypt.genSalt(10);
    let hashedPswd = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPswd,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      month1:req.body.month1,
      month2:req.body.month2,
      month3:req.body.month3,
      month4:req.body.month4
    });
    await user.save();

    //send res
    res.status(201).send(user);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("bad request..");
    }
  }
});

router.get('/:userId/packages', (req, res) => {
  User.findOne({ _id: req.params.userId })
    .populate('packages')
    .exec((error, user) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching data from database');
      } else {
        console.log('User and packages fetched!');
        res.status(200).send(user.packages);
      }
    });
});

module.exports = router;





