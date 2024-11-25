const express = require('express');
const {getAllPosts, getPost, addPost, addComment, getComments} = require('../controller/postController')
const {checkAuth} = require('../utils/auth')

const router = express.Router();

router.get('/', getAllPosts)
router.get('/:id', getPost)
router.get('/:id/comments', getComments)

router.use(checkAuth);
router.post('/', addPost)
router.post('/:id/comment', addComment)

module.exports = router;