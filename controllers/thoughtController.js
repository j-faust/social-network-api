const { User, Thought } = require('../models');

// exporting thought and reaction controllers
module.exports = {

    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json({ message: 'Nothing Found!' }))
    },
    
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No Thought Found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Update a Thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No Thought Found! '})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Deleting a Thought
    deleteAThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No Thought Found! '})
            : res.json({ message: 'Thought Deleted!' })
        )
        .catch((err) => res.status(500).json(err))
    },

    // create reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.body.thoughtId},
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }           
            )
            .then((thought) => 
            !thought
            ? res.statu(404).json({ message: 'Thought Not Found!' })
            : res.json(thought)
            )
            .catch((err) => res.status(505).json(err))
    },

    // delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId }},
            { new: true }
        )
            .then((thought) => 
                !thought 
                ? res.status(404).json({ message: 'Thought Not Found!' })
                : res.json({ message: 'Reaction Deleted Successfully' })
                )
            .catch((err) => res.status(500).json(err))
    }

};
