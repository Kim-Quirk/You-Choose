const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomId = new Schema({
  idCode: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  //a collection of all the restaurants the room is looking at
  allRestaurants: [
    {
      restaurant_name: {
        type: String
      },
      restaurant_id: {
        type: Number
      },
      price_range: {
        type: String
      },
      cuisines: {
        type: Array
      },
      vote: {
        type: Number
      },
      voteCount: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model('RoomId', RoomId);