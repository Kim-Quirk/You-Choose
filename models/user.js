const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  savedResults: {
    results: [{
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Result',
        required: true
      },
      resultSet: {
        type: Array,
        required: true
      }
    }]
  }
});

userSchema.methods.removeFromResults = function (resultId) {
  const updatedResultSet = this.savedResults.results.filter(result => {
    return result._id.toString() !== resultId.toString();
  });
  if (this.savedResults.results.length == updatedResultSet.length) {
    return false
  };
  this.savedResults.results = updatedResultSet;
  this.save();
  return true
};

module.exports = mongoose.model('User', userSchema);