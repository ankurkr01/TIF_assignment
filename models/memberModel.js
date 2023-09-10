
const mongoose = require('mongoose')


const memberSchema = mongoose.Schema({
    id: {
        type: String,
    },
    community: {
        type: String,
        ref:"Community"
    },
    user: {
        type: String,
        ref:"User"
    },
    role: {
        type: String,
        ref:"Role"
     
    },
},{ timestamps: true })



module.exports = mongoose.model('Member', memberSchema);
