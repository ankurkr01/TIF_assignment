const { Snowflake } = require("@theinternetfolks/snowflake");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Role = require("../models/roleModel");
const apiFeatures = require("../utils/apiFeatures");

// Create Role 

exports.createRole = catchAsyncErrors(async (req, res, next) => {

    const { name } = req.body;
    const id = Snowflake.generate()

    const role = await Role.create({
        id: id,
        name,

    });

    res.status(201).json({ success: true, data: role })


})

// Get All Role 

exports.allRoles = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 10;
    const roleCount = await Role.countDocuments();

    const apifeatures = new apiFeatures(Role.find(), req.query)
    let roles = await apifeatures.query.clone();
    apifeatures.pagination(resultPerPage);

    roles = await apifeatures.query;
    let pages;
    let rem = roleCount % resultPerPage
    let page = roleCount / resultPerPage

    if (page >= 1 && rem > 0) {
        pages = page + 1;
    } else {
        pages = 1;
    }

    res.status(200).json({ success: true, content: { mata: { total: roleCount, pages: pages }, data:roles } })

})