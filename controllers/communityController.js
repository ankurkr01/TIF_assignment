const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Community = require("../models/communityModel");
const { Snowflake } = require('@theinternetfolks/snowflake');
const apiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");

// create community 

exports.createCommunity = catchAsyncErrors(async(req, res , next)=>{

    const {name} = req.body;
    const id = Snowflake.generate()

    let slug = name.toLowerCase();

    const community = await Community.create({
        id: id,
        name,
        slug,
        owner:req.user.id

    });

    res.status(201).json({ success: true, data: community })



})

// get all community 

exports.allCommunity = catchAsyncErrors(async(req, res , next )=>{

    const resultPerPage = 10;
    const communityCount = await Community.countDocuments();

    const apifeatures = new apiFeatures(Community.find(), req.query)
    let communities = await apifeatures.query.clone();
    apifeatures.pagination(resultPerPage);

    communities = await apifeatures.query;
    let pages;
    let rem = communityCount % resultPerPage
    let page = communityCount / resultPerPage

    if (page >= 1 && rem > 0) {
        pages = page + 1;
    } else {
        pages = 1;
    }

    let abc = await Community.find({},(err,foundCommunity)=>{
        if(err){
            console.log(err);
            return
        }
        User.findOne({id:foundCommunity.id},(err,foundUser)=>{
            if(err){
                console.log(err);
                return
            }
            foundCommunity.owner = foundUser
            console.log(foundCommunity);
        })
    })
    res.status(200).send(abc)

    
    // res.status(200).json({ success: true, content: { mata: { total: communityCount, pages: pages }, data:communities } })

})