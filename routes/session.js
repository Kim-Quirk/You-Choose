// get data, create session, join
const express = require('express');
const router = express.Router();
const { query } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');

const controller = require('../controllers/session')

router.get('/createSession', isAuth, controller.createSession);

router.get('/getRestaurantData', controller.getData);

router.get('/roomExists', [
    query('roomId').isLength({ min: 6 }).withMessage('room id is too short').isNumeric().withMessage('room id should be made of only numbers').trim()
],
    controller.roomExists);

module.exports = router;