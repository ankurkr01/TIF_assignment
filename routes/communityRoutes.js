const express = require('express');
const communityController = require('../controllers/communityController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/community', isAuthenticatedUser, communityController.createCommunity)
router.get('/community', isAuthenticatedUser, communityController.allCommunity)
router.get('/community/:id/members', isAuthenticatedUser, communityController.allMembers)
router.get('/community/me/owner', isAuthenticatedUser, communityController.myowneCommunity)
router.get('/community/me/member', isAuthenticatedUser, communityController.joinCommunity)


module.exports =router