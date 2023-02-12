const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addUserFriend,
    deleteUserFriend,
} = require('../../controllers/userController');

// route for '/api/users
router.route('/').get(getUser).post(createUser);

// route for '/api/users/:userid'
router.route('/:userId').get(getSingleUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend);

module.exports