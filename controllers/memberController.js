const { Snowflake } = require("@theinternetfolks/snowflake");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../models/memberModel");
const apiFeatures = require("../utils/apiFeatures");

exports.addMember = catchAsyncErrors(async(req, res, next)=>{

    const { communityId, roleId, userId } = req.body;
    

    const member = await Member.create({
        community:communityId,
        user:userId,
        role:roleId
    })

    res.status(201).json({ success: true, data: member })


})