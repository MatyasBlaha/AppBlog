const express = require('express');
const {checkAuth} = require('../utils/auth')
const {getComments, addComment, deleteComment} = require("../controller/commentController");

const router = express.Router();

router.get('/:id/comments', getComments)

router.use(checkAuth);
router.post('/:id/comment', addComment)
router.post('/:id/delete', deleteComment)

module.exports = router;