const express = require('express');

const userController = require('./../Controller/userController');
const authController = require('../Controller/abhaAuthController');

const router = express.Router();


router
.route('/')

// CUSTOM LOGIN ROUTES

router.post('/signup',authController.signup); // custom email/password
router.post('/login', authController.login); // custom login
router.get('/logout', authController.logout); // clear token

// ABHA LOGIN ROUTES

router.get('/abha/login', authController.abhaLogin); // redirect to the ABHA
router.get('/abha/callback', authController.abhaCallback); // handle ABHA redirect 

// Protected Route(works for both login types)

router.get('/me',authController.protect, userController.getMe); // get current user 

// localhost:271017/api/v1/namaste/login --> this will login the users 
// localhost:271017/api/v1/namaste/signup --> this will signup the users 
// localhost:271017/api/v1/namaste/logout --> this will logout the users 
