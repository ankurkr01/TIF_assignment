const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { Snowflake } = require('@theinternetfolks/snowflake')



// Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    const { name, email, password } = req.body;
    const id = Snowflake.generate()

    const user = await User.create({
        id: id,
        name,
        email,
        password,

    });

    sendToken(user, 201, res);
});



// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    if (!email || !password) {
      return next(new Errorhandler("Please Enter Your Email & Password", 400));
    }
    const user = await User.findOne({ email: email }).select('+password');
  
    if (!user) {
      return next(new Errorhandler("Invalid Email or Password", 401));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
   
  
    if (!isPasswordMatch) {
      return next(new Errorhandler("Invalid Email or Password", 401));
    }
  
    sendToken(user, 200, res);
  });

  // Get user Details 
exports.getUserDetails = catchAsyncErrors(async (req, res, next)=>{
  // console.log(req.user); 
  const user = await User.find({id:req.user.id});

  res.status(200).json({
    success:true,
    user
  })

})