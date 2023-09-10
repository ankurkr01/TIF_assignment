const express = require('express');
const memberController = require('../controllers/memberController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/member', isAuthenticatedUser, memberController.addMember)
router.post('/member/:id', isAuthenticatedUser, memberController.removeMember)


module.exports =router