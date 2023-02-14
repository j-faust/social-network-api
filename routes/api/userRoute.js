const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addUserFriend,
    deleteUserFriend,
    deleteSingleUser,
} = require('../../controllers/userController');

// route for '/api/users
router.route('/').get(getUser).post(createUser);

// route for '/api/users/:userid'
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteSingleUser);

router.route('/:userId/friends').post(addUserFriend);

router.route('/:userId/friends/:friendId').delete(deleteUserFriend);

module.exports = router;