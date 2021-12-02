const Documenu = require('documenu');
const User = require('../models/user');
const mongoose = require('mongoose');


Documenu.configure(process.env.API_KEY);

//save result set to a user.
// Takes in a UserID and a result set as an array (no size requirements).
exports.postSave = (req, res, next) => {
    const results = req.body.results;
    if (!results) {
        return res.status(404).json({
            message: "No results provided",
            results: results
        });
    }
    const userId = req.userId;
    if (!userId) {
        return res.status(404).json({
            message: "No userID provided"
        });
    }
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "This user does not exist. No results found."
                });
            } else {
                let now = new Date();
                let objectResults = {
                    _id: new mongoose.Types.ObjectId(),
                    date: now,
                    resultSet: results
                };
                user.savedResults.results.push(objectResults);
                user.save().catch(err => {
                    const error = new Error(err);
                    return res.status(500).json({
                        message: "Error",
                        error: error.message
                    });
                });
                return res.status(200).json({
                    message: "Results saved",
                    results: results
                });
            }
        })
        .catch(err => {
            const error = new Error(err);
            res.status(500).json({
                message: "This user does not exist",
                error: error.message
            });
        });
};

// Deltes a result set
// Takes in a result ID and a user ID.
// Returns an error or a success message.
exports.postDelete = (req, res, next) => {

    const resultId = req.body.resultId;
    const userId = req.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "No userID provided."
                });
            } else {
                result = user.removeFromResults(resultId)
                console.log(result)
                if (result) {
                    return res.status(204).json({
                        message: "Successfully deleted!",
                    });
                } else {
                    return res.status(400).json({
                        message: "An error occured. The result ID was not found.",
                    });
                }
            }
        })
        .catch(err => {
            const error = new Error(err);
            res.status(500).json({
                message: "This user does not exist. No results found.",
                error: error.message
            });
        });
}

// Gets all the saved results for one user
// Gets a user ID
// Does not yet check if the logged in user is the userID being sent in.
// Returns an array of objects with arrays of results (look at readme for example responses)
exports.getResults = (req, res, next) => {
    const userId = req.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "This user does not exist. No results found."
                });
            } else {
                const results = user.savedResults.results;
                return res.status(200).json({
                    message: "View your previous results",
                    results: results
                });
            }
        })
        .catch(err => {
            const error = new Error(err);
            res.status(500).json({
                message: "This user does not exist",
                error: error.message
            });
        });
};