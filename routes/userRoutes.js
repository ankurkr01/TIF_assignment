const express = require('express');
const userController = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/signup', userController.registerUser)
router.post('/signin', userController.loginUser)
router.get('/me', isAuthenticatedUser, userController.getUserDetails)


module.exports =router