 const { ObjectId } = require('mongoose').Types;
 const { User, Thought } = require('../models');

 module.exports = {
    // geting all users 
    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
        },
    // getting a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('reactions')
            .select('-__v')
            .then((user) => 
                !user
                  ? res.status(404).json({ message: 'No User Found with that ID' })
                  : res.json(user)
                )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // creating a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {$set: req.body },
            { runValidators: true, new: true }
            )
            .then((user) => 
                !user 
                ? res.status(404).json({ message: 'No User Found With That Id!'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
