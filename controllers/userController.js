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