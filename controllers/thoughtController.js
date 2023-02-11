const e = require('express');
const { User, Thought } = require('../models');

module.exports = {

    // get all thoughts
    getThoughts(req, res) {
        Thought.findAll({})
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
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.UserId },
                    {$push: { thoughts: _id }},
                )
            })
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No Thought Found! '})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Updata a thought 
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

    // Deleting a thought
    deleteAThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No Thought Found! '})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
};
