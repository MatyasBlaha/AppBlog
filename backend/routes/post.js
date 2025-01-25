const express = require('express');
const {getAllPosts, getPost, addPost} = require('../controller/postController')
const {checkAuth} = require('../utils/auth')

const router = express.Router();

router.get('/', getAllPosts)
router.get('/:id', getPost)

router.use(checkAuth);
router.post('/', addPost)

module.exports = router;