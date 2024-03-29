const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose=require("mongoose");
const helmet= require("helmet");
const session = require("express-session");
const axios = require("axios");


const ejs= require("ejs");
const logging=require("./middlewares/logging");
const studentsRouter=require("./routes/Students");
const userRouter=require("./routes/User");
const authRouter=require("./routes/auth");
const adminRouter=require("./routes/admin");
const consumptionRouter = require('./routes/Package');




//2) set connection
mongoose.connect("mongodb://localhost:27017/iti",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>{
    console.log("connected to Database...")
})
.catch((err)=>{
    console.log(err)
});

//built in midlleware
app.use(
    session({
      secret: "your secret key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using https
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use("/hello",express.static("public")); //static files (css,html,js,img,..)


//user middleware(APPLICATION-LEVEL MIDDLEWARE)
//LOGIN
app.use(logging);

app.use("/api/Students",studentsRouter);
app.use("/api/Users",userRouter);
app.use("/api/login",authRouter);
app.use("/api/admin",adminRouter);
app.use("/api/package", packageRouter);

//app.use(errorMW);

const port = process.env.PORT || 3001;




app.listen(port,()=>{
    console.log(`listening to ${port}..`)
});