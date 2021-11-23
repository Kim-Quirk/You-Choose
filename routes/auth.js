// Login & SignUp, change password, log out
const express = require('express');
const { check, body } = require('express-validator/check');
const router = express.Router();

const controller = require('../controllers/auth');
const User = require('../models/user');


router.post(
    '/login',
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
        body('password', 'Password has to be valid.')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
], 
controller.postLogin);

router.post(
    '/signup',
    [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject(
                        'E-Mail already exists! Please pick a different one.'
                    );
                }
            });
        })
        .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
     controller.postSignup);


// router.post('/logout', controller.postLogout);

module.exports = router;