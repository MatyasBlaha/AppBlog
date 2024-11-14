const express = require('express');
const {getAll} = require('../data/event')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json({ posts: posts });
    } catch (error) {
        next(error);
    }
})


module.exports = router;