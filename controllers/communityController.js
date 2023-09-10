const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Community = require("../models/communityModel");
const apiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const Member = require("../models/memberModel");

// create community 

exports.createCommunity = catchAsyncErrors(async (req, res, next) => {

    const { name } = req.body;

    let slug = name.toLowerCase();

    const community = await Community.create({
        name,
        slug,
        owner: req.user._id

    });

    res.status(201).json({ success: true, data: community })



})

// get all community 

exports.allCommunity = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 10;
    const communityCount = await Community.countDocuments();

    const apifeatures = new apiFeatures(Community.find({}).populate('owner', 'name'), req.query)
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


    res.status(200).json({ success: true, content: { mata: { total: communityCount, pages: pages }, data: communities } })

})

exports.allMembers = catchAsyncErrors(async (req, res, next) => {

    const communityId = req.params.id;


    const resultPerPage = 10;
    const memberCount = await Member.countDocuments();

    const apifeatures = new apiFeatures(Member.find({ community: communityId }).populate([{
        path: 'user',
        model: 'User',
        select: 'name'
    },
    {
        path: 'role',
        model: 'Role',
        select: 'name'
    }]), req.query)
    let members = await apifeatures.query.clone();
    apifeatures.pagination(resultPerPage);

    members = await apifeatures.query;
    let pages;
    let rem = memberCount % resultPerPage
    let page = memberCount / resultPerPage

    if (page >= 1 && rem > 0) {
        pages = page + 1;
    } else {
        pages = 1;
    }


    res.status(200).json({ success: true, content: { mata: { total: memberCount, pages: pages }, data: members } })
})

exports.myowneCommunity = catchAsyncErrors(async(req, res , next)=>{



    const resultPerPage = 10;

    const apifeatures = new apiFeatures(Community.find({owner:req.user._id}), req.query)
    let mycommunity = await apifeatures.query.clone();
    apifeatures.pagination(resultPerPage);

    mycommunity = await apifeatures.query;
    let pages;
    let rem = mycommunity?.length % resultPerPage
    let page = mycommunity?.length / resultPerPage

    if (page >= 1 && rem > 0) {
        pages = page + 1;
    } else {
        pages = 1;
    }

    res.status(200).json({ success: true, data: { mata: { total: mycommunity?.length, pages: pages }, data: mycommunity } })


})

exports.joinCommunity = catchAsyncErrors(async(req, res, next)=>{

    const resultPerPage = 10;

    const apifeatures = new apiFeatures(Member.find({user:req.user._id}), req.query)
    let mycommunity = await apifeatures.query.clone();
    apifeatures.pagination(resultPerPage);

    mycommunity = await apifeatures.query;
    let pages;
    let rem = mycommunity?.length % resultPerPage
    let page = mycommunity?.length / resultPerPage

    if (page >= 1 && rem > 0) {
        pages = page + 1;
    } else {
        pages = 1;
    }

    res.status(200).json({ success: true, data: { mata: { total: mycommunity?.length, pages: pages }, data: mycommunity } })



})