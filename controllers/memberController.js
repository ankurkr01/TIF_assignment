const { Snowflake } = require("@theinternetfolks/snowflake");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../models/memberModel");
const apiFeatures = require("../utils/apiFeatures");
const Community = require("../models/communityModel");

// Add Member

exports.addMember = catchAsyncErrors(async(req, res, next)=>{

    const { communityId, roleId, userId } = req.body;
    

    const member = await Member.create({
        community:communityId,
        user:userId,
        role:roleId
    })

    res.status(201).json({ success: true, data: member })


})

// Remove Member

exports.removeMember = catchAsyncErrors(async(req, res , next)=>{

    const memberId = req.params.id;

    const member = await Member.findById(memberId)

    if(!member){
        return next(new Errorhandler(`member not found with the given id ${memberId}`,400))
      } 

      await Member.findByIdAndDelete(memberId);

      res.status(200).json({
        success:true,
        message:'member deleted successfully'
      })


})
