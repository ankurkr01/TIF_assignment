const express = require('express');
const communityController = require('../controllers/communityController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/community', isAuthenticatedUser, communityController.createCommunity)
router.get('/community', isAuthenticatedUser, communityController.allCommunity)


module.exports =router