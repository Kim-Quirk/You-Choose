//save result. delete. view
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const controller = require('../controllers/result')

//save one set of results
// router.post('/saveResult', isAuth, controller.postSave);
router.post('/saveResult', controller.postSave);

//delete one set of results
// router.post('/deleteResult', isAuth, controller.postDelete);
router.post('/deleteResult', controller.postDelete);

//get all saved results
// router.get('/getResults', isAuth, controller.getResults);
router.get('/getResults', controller.getResults);

module.exports = router;