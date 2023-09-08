const express = require('express');
const userController = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/signup', userController.registerUser)


module.exports =router