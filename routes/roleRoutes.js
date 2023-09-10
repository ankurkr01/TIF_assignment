const express = require('express');
const roleController = require('../controllers/roleController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/role', isAuthenticatedUser, roleController.createRole)
router.get('/role', isAuthenticatedUser, roleController.allRoles)


module.exports =router