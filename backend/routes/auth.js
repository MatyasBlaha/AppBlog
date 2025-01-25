const express = require('express');
const { signup, login, getProfile } = require('../controller/authController')
const {checkAuth} = require("../utils/auth");

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.use(checkAuth);
router.get('/profile/:id', getProfile)

module.exports = router;