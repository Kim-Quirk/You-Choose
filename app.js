if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const testData = require('./data/sampleData');
const socketServer = require('./socket');

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(bodyParser.urlencoded()) //for form data sent through <form></form> Rest apis don't usually use these forms
app.use(bodyParser.json()); //for parsing and sending json data

const authRoutes = require('./routes/auth.js');
const resultRoutes = require('./routes/result');
const sessionRoutes = require('./routes/session');

const RoomId = require('./models/roomId');
const socket = require('./socket');
const { resolveObjectURL } = require('buffer');

const corsOptions = {
	origin: '',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//fixing potential CORS blocking
app.use((req, res, next) => {
	//allow access from any client, or particular client
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

app.use(authRoutes);
app.use(resultRoutes);
app.use(sessionRoutes);
app.use('/', (req, res, next) => {
	res.status(400).json({
		message: 'Page Not Found',
	});
});

const server = app.listen(PORT);

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
	console.log(err);
});

const io = createSocketConnection(server);

// listens for new people connecting to server
// io is server side socket. Socket refers to client side socket.
// happens when person clicks on the join room button or the admin joins room
io.on('connection', async (socket) => {
	// const roomId = options.query.roomId;
	const roomId = (socket.handshake.query.roomId)
	console.log('join room')
	if (!await validateJoinRoom(socket, roomId)) {
		console.log('invalid room')
		return
	}
	joinAlert();

	socket.on('start-session', (roomId) => {
		const restaurants = getRestaurants().map((restaurant) => ({
			...restaurant,
			// score of the vote
			vote: 0,
			// num of people who have voted
			voteCount: 0
		}));
		addRestaurantsToDb(roomId, restaurants)
		startSession(socket, roomId, restaurants);
		
	});

	//Stuff that happens when a user clicks 'like' or 'dislike'
	socket.on('countResult', (result) => {
		// result is a object
		// { restaurantId: <num>, vote: <num>, roomId: <num> }
		//get restaurants from db
		RoomId.findOne({ idCode: result.roomId }).then(room => {

			const userCount = getUserCount(result.roomId);
			// get index of the restaurant that is being voted on currently
			const restaurantIndex = room.allRestaurants.findIndex(
				(restaurant) => restaurant.restaurant_id === result.restaurantId
			);
			//update restaurants
			room.allRestaurants[restaurantIndex].vote += result.vote;
			room.allRestaurants[restaurantIndex].voteCount++;
			room.save()
			
			//if there are as many votes as there are users:
			if (userCount <= room.allRestaurants[restaurantIndex].voteCount) {
				//if we've reached the end of all the restaurants
				if (restaurantIndex === room.allRestaurants.length - 1) {
					return pickBestRestaurant(room.allRestaurants, result.roomId);
				}
				io.sockets.in(result.roomId).emit('nextRestaurant', room.allRestaurants[restaurantIndex + 1])
			}
		})

	});
});  


//take an array of restaurants and add it to the database to associate with the roomId
async function addRestaurantsToDb(roomId, restaurants) {
	return await RoomId.findOne({ idCode: roomId })
		.then((room) => {
			room.allRestaurants = restaurants;
			return room.save();
		})
		.catch(err => {
			console.log(err)
		})
}

// sets up potential socket connections
function createSocketConnection(server) {
	const io = socketServer.init(server);
	return io;
}

// check to see if the room exists, then add them to the room if they do
async function validateJoinRoom(socket, roomId) {
	// get roomId from query
	
	// make sure roomId is active before proceeding
	return await RoomId.findOne({ idCode: roomId })
		.then((room) => {
			let userId = socket.id;
			//if the room is inactive, send error
			if (!room) {
				socket.emit('errorMsg', {
					ErrorMsg: `Invalid room Id {${roomId}}`,
				});
				return false
			} else {
				console.log(`user ${userId} has joined ${roomId}`);
				//add new user to room
				socket.join(roomId);
				//send verification out to person who joined
				io.to(roomId).emit('joinConfirm', roomId);
				return true
			}
		})
		.catch((err) => {
			console.log(err);
			return false
		});
}

// alerts that someone joined the room for purposes of counting
function joinAlert() {
	 
	io.of('/').adapter.on('join-room', (room, id) => {
		let count = getUserCount(room)
		io.to(room).emit('new-join', count);
	});

}

// make sure there is one person in the room and
function startSession(socket, roomId, restaurants) {
	// TODO: make sure there is at least 1 person in the room
	let room = io.sockets.adapter.rooms.get(roomId);
	if (!room) {
		return io.emit(
			'errorMsg',
			'At least one person must join to start a room'
		);
	}

	// stuff that happens if the room exists and the session starts.
	console.log(`${roomId} session started`);
	io.sockets.in(roomId).emit(
		'room-start-success',
		`room ${roomId} started successfully`
	);
	io.sockets.in(roomId).emit('nextRestaurant', restaurants[0])

}

// gets count of users in a room
function getUserCount(roomId) {
	let count = io.sockets.adapter.rooms.get(`${roomId}`).size;
	return count;
}

function getRestaurants() {
	return testData.restaurants.data;
}

function pickBestRestaurant(restaurants, roomId) {
	restaurants.sort((a, b) => {
		if (a.vote > b.vote) {
			return -1;
		}
		if (a.vote < b.vote) {
			return 1;
		}
		return 0;
	})
	console.log(restaurants)
	let top3 = [restaurants[0].restaurant_name, restaurants[1].restaurant_name, restaurants[2].restaurant_name]
	io.to(roomId).emit('finish', top3);
	
}
