const express = require('express');
const { checkAuth } = require('../utils/auth')
const {getAllProfilePosts, getForeignProfile, followProfile, getUsersListByAdmin, changeUserRole} = require("../controller/profileController");

const router = express.Router();

router.get('/:id/posts', getAllProfilePosts)
router.get('/:id/foreign', getForeignProfile)

router.use(checkAuth);
router.get('/:userId/usersList', getUsersListByAdmin)
router.post('/follow/:userIdForeign/:userId', followProfile)
router.put('/:userId/changeUserRole', changeUserRole)

module.exports = router;