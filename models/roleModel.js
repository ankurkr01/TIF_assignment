const mongoose = require('mongoose')


const roleSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: [true, "Please Enter Role Name"],
        maxLength: [30, "Name Cannot Exceed 30 characters"],
        minLength: [2, "Name should have more than 2 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Role', roleSchema);
