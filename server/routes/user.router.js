const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const auth = require("../middleware/auth");

const crtlUser = require('../controllers/user.controller');

router.post('/register',crtlUser.register);
router.post('/login', crtlUser.login);
router.get('/profile-data',[auth], crtlUser.getData);

module.exports = router;