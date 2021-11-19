const { User, Thought } = require('../models');


const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts'
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //create user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

    //update User by Id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(404).json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // addFriend,
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            {$push: { friends: params.friendId }},
            {new: true})
            .populate({
                path: 'friends'
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).message({ message: 'no user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // deleteFriend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            {$pull: { friends: params.friendId }}, {new: true} )
            .populate({
                path: 'friends'
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).message({ message: 'no user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;