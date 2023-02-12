const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    updateThought,
    deleteAThought,
    createReaction,
    createThought,
    deleteReaction
} = require('../../controllers/thoughtController');

// route to get all thoughts and create thoughts
router.route('/').get(getThoughts).post(createThought)

// route to get, update and delete thoughts using id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteAThought);

// route to get reactions 
router.route('/:thoughtId/reactions').post(createReaction);

// route to delete a reaction 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// exporting router
module.exports = router;

