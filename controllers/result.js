const Documenu = require('documenu');
const User = require('../models/user');
const mongoose = require('mongoose');


Documenu.configure(process.env.API_KEY);

//save result. delete. view
exports.postSave = (req, res, next) => {
    const results = req.body.results;
    const userId = req.body.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "This user does not exist. No results found."
                });
            } else {
                let objectResults = {
                    _id: new mongoose.Types.ObjectId(),
                    resultSet: results
                };
                user.savedResults.results.push(objectResults);
                user.save().catch(err => {
                    const error = new Error(err);
                    return res.status(500).json({
                        message: "An Error occured while saving",
                        error: error
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
                message: "An Error occured",
                error: error
            });
        });
};

// This function works... however, if they send in an ID that does not exist, it returns it as a success...
exports.postDelete = (req, res, next) => {
    const resultId = req.body.resultId;
    const userId = req.body.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "This user does not exist. No results found."
                });
            } else {
                result = user.removeFromResults(resultId)
                console.log(result)
                if (result) {
                    return res.status(200).json({
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
                message: "An Error occured",
                error: error
            });
        });
}

// exports.postDelete = (req, res, next) => {
//     const resultId = req.body.resultId;
//     const userId = req.body.userId;
//     User.findOne({
//             _id: userId
//         })
//         .then(user => {
//             if (!user) {
//                 return res.status(422).json({
//                     message: "This user does not exist. No results found."
//                 });
//             } else {
//                 user.savedResults.results.findOne({
//                         _id: resultId,
//                     })
//                     .then(result => {
//                         if (!result) {
//                             return res.status(422).json({
//                                 message: "This result set does not exist. No results found."
//                             });
//                         } else {
//                             delete result;
//                         }
//                     })
//                     .catch(err => {
//                         const error = new Error(err);
// return res.status(500).json({
//     message: "An Error occured while saving",
//     error: error
// });
//                     });
// return res.status(200).json({
//     message: "The following results were deleted",
//     results: results
// });
//             }
//         })
//         .catch(err => {
//             const error = new Error(err);
//             res.status(500).json({
//                 message: "An Error occured",
//                 error: error
//             });
//         });
// };

exports.getResults = (req, res, next) => {
    const userId = req.body.userId;
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
                message: "An Error occured",
                error: error
            });
        });
};