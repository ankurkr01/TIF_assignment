
const mongoose = require('mongoose')


const memberSchema = mongoose.Schema({
  
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Community"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
},{ timestamps: true })



module.exports = mongoose.model('Member', memberSchema);
