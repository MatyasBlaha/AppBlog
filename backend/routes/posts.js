const express = require('express');
const {getAll, get} = require('../data/event')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json({ posts: posts.posts });
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const post = await get(req.params.id);
        console.log(post)
        res.json({ post: post });
    } catch (error) {
        next(error);
    }
});


module.exports = router;