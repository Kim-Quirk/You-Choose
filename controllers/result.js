const Documenu = require('documenu');
const User = require('../models/user');
const mongoose = require('mongoose');
const errormsg = require('../error');


Documenu.configure(process.env.API_KEY);

//save result set to a user.
// Takes in a UserID and a result set as an array (no size requirements).
exports.postSave = (req, res, next) => {
    const results = req.body.results;
    const errors = [];
    if (!results) {
        errors.push("No results provided");
    }
    const userId = req.userId;
    if (!userId) {
        errors.push("No userID provided from decoded token");
    }
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                errors.push("No userID provided from decoded token");
                console.log(errors);
            } else {
                let now = new Date();
                let objectResults = {
                    _id: new mongoose.Types.ObjectId(),
                    date: now,
                    resultSet: results
                };
                user.savedResults.results.push(objectResults);
                user.save().catch(err => {
                    errors.push(err.message);
                    console.log(errors);
                });
                if (errors.length !== 0) {
                    err = errormsg(errors);
                    return res.status(404).json({
                        message: "One or more errors occured.",
                        error: err
                    });
                }
                return res.status(200).json({
                    message: "Results saved",
                    results: result
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
    const errors = []
    const resultId = req.body.resultId;
    const userId = req.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                errors.push("User not found by decoded token.");
            } else {
                result = user.removeFromResults(resultId)
                console.log(result)
                if (result) {
                    return res.status(204).json({
                        message: "Successfully deleted!",
                    });
                } else {
                    errors.push("The result ID was not found");
                }
            }
            if (errors.length !== 0) {
                err = errormsg(errors);
                return res.status(404).json({
                    message: "One or more errors occured.",
                    error: err
                });
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
    const errors = [];
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                errors.push("This user does not exist. No results found.");
            } else {
                const results = user.savedResults.results;
                return res.status(200).json({
                    message: "View your previous results",
                    results: results
                });
            }
            if (errors.length !== 0) {
                err = errormsg(errors);
                return res.status(404).json({
                    message: "One or more errors occured.",
                    error: err
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