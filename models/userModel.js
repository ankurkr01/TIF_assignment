const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name Cannot Exceed 30 characters"],
        minLength: [3, "Name should have more than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your Name"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password Should be greater than 6 characters"],
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);