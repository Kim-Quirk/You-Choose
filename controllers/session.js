// get data, create session, join
const RoomId = require("../models/roomId");
const session = require("../socket");
const testData = require("../data/sampleData");
const Documenu = require('documenu');
Documenu.configure(process.env.API_KEY);
const {
  check,
  body,
  validationResult
} = require('express-validator/check');


// for setting up a session so people can join it
// also get restaurant data and store that to the room in the database
exports.createSession = (req, res, next) => {
  //Store something called nextRoomId that increments every time a new id is needed
  RoomId.findOne({
      name: "nextRoomId"
    })
    .then(async (room) => {
      if (!room) {
        //Default roomId if not found: 100000
        const nextId = new RoomId({
          idCode: 100000,
          name: "nextRoomId",
        });
        nextId.save();
        roomId = 100000;
      }
      roomId = room.idCode;
      room.idCode++;
      room.save();

      //here is the spot to get the data:
      let restaurantData = await getData(req, res, next)

      const currentRoom = new RoomId({
        idCode: roomId,
        allRestaurants: restaurantData.map((restaurant) => ({
          ...restaurant,
          // score of the vote
          vote: 0,
          // num of people who have voted
          voteCount: 0
        }))

      });
      currentRoom.save();

      return res.status(200).json({
          message: "Session created",
          roomId: roomId,
          roomInfo: currentRoom

        })
        .catch((err) => {
          res.status(500).json({
            Message: 'An error ocurred',
            error: err.message
          });
          console.log(err)
        });
    });
}

//check if a room someone is trying to join is set up
//get roomId from query params
exports.roomExists = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  let roomId = req.query.roomId;

  RoomId.findOne({
    idCode: roomId
  }).then(room => {
    if (room) {
      return res.status(200).json({
        message: `room ${roomId} exists.`,
        roomExists: true
      })
    }
    res.status(404).json({
      message: `room ${roomId} does not exist.`,
      roomExists: false
    });
  })
}


//THis is where you connect to the restaurant api and get the data to send.
//KIM
//Assume you are getting these from the frontend:
//FILL IN INFO YOU NEED HERE
async function getData(req, res, next) {
  let lat = req.body.lat;
  let lon = req.body.lon;
  let radius;
  if (!req.body.radius) {
    radius = 5;
  } else {
    radius = req.body.radius;
  }
  if (!req.body.lat || !req.body.lon) {
    throw new Error("Improperly defined query. Failed to retrieve data.");
  }

  const params = {
    lat: lat,
    lon: lon,
    distance: radius,
  };

  return await Documenu.Restaurants.searchGeo(params)
    .then((response) => {
      if (!response.data || response.data.length == 0) {
        throw new Error("No restaurants found with the provided query.");
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      console.log("Unsuccessful response: ", err);
      // return res.status(500).json({
      //   message: "Unsuccessful response",
      //   error: err
      // });
      throw new Error(err.message);
    });
};