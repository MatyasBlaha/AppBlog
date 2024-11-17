const express = require('express')
const { checkAuth } = require('../utils/auth')
const {getUser} = require("../data/event");

const router = express.Router();


router.use(checkAuth);

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await getUser(req.params.userId);
        res.json(user);
    } catch (err) {
        next(err)
    }
})


module.exports = router;