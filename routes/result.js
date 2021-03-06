//save result. delete. view
const express = require('express');
const router = express.Router();
const cors = require('cors');
const isAuth = require('../middleware/is-auth');

const controller = require('../controllers/result')


//save one set of results
router.post('/saveResult', isAuth, controller.postSave);
// router.post('/saveResult', controller.postSave);

router.options('/deleteResult', cors());
//delete one set of results
router.delete('/deleteResult', cors(), isAuth, controller.postDelete);
// router.post('/deleteResult', controller.postDelete);

//get all saved results for specific user
router.get('/getResults', isAuth, controller.getResults);
// router.get('/getResults', controller.getResults);

module.exports = router;