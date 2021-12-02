if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const rooms = require('./rooms');

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(bodyParser.urlencoded()) //for form data sent through <form></form> Rest apis don't usually use these forms
app.use(bodyParser.json()); //for parsing and sending json data

const authRoutes = require('./routes/auth.js');
const resultRoutes = require('./routes/result');
const sessionRoutes = require('./routes/session');

// const corsOptions = {
// 	origin: '',
// 	optionsSuccessStatus: 200,
// };

//fixing potential CORS blocking
// app.use((req, res, next) => {
// 	//allow access from any client, or particular client
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PUT, PATCH, DELETE'
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'Content-Type, Authorization'
// 	);
// 	res.setHeader('Access-Control-Allow-Credentials', true)
// 	next();
// });

app.use(cors());

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

rooms.allowSocketConnection(server);
