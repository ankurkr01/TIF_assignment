
const mongoose = require('mongoose')


const communitySchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Please Enter Community Name"],
        maxLength: [30, "Name Cannot Exceed 30 characters"],
        minLength: [2, "Name should have more than 2 characters"],
    },
    slug: {
        type: String,
       
    },
    owner: {
        type: String,
        ref:"User"
     
    },
},{ timestamps: true })



module.exports = mongoose.model('Community', communitySchema);
