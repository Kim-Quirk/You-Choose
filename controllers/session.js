// get data, create session, join
const RoomId = require("../models/roomId");
const session = require("../socket");
const testData = require("../data/sampleData");

//for setting up a session so people can join it
exports.createSession = (req, res, next) => {
  //TODO: generate new roomId and store in db
  //Store something called nextRoomId that increments every time a new id is needed

  RoomId.findOne({ name: "nextRoomId" })
    .then((room) => {
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

      const currentRoom = new RoomId({
        idCode: roomId,
      });
      currentRoom.save();

      res.status(200).json({
        message: "Session created",
        roomId: roomId,
      });
    })
    .catch((err) => {
      res.status(500).send();
    });
};

//check if a room someone is trying to join is set up
//get roomId from query params
exports.roomExists = (req, res, next) => {

}


//THis is where you connect to the restaurant api and get the data to send.
//KIM
//Assume you are getting these from the frontend:
//FILL IN INFO YOU NEED HERE
exports.getData = (req, res, next) => {
  var data = new Object();
  let lat = req.params.lat;
  let lon = req.params.lon;
  let radius;
  if (!req.params.radius) {
    radius = 5;
  } else {
    radius = req.params.radius;
  }
  if (!req.params.lat || !req.params.lon) {
    return res.status(200).json({
      message: "Improperly defined query. Failed to retrieve data.",
    });
  }
  // This should come form the front end. Temporarily hard coded in for testing.
  const params = {
    lat: lat,
    lon: lon,
    distance: radius,
  };
  Documenu.Restaurants.searchGeo(params)
    .then((response) => {
      data = response.data;
      console.log(data);
      return res.status(200).json({
        message: "here are your results",
        Restaurants: data,
      });
    })

    .catch((err) => {
      console.log("Unsuccessful response: ", err);
      return res.status(200).json({
        message: "Some error occured.",
      });
    });
};
