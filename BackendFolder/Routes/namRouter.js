const express = require('express');

const userController = require('./../Controller/userController');
const authController = require('../Controller/abhaAuthController');
const bundleController = require('../Controller/bundleController');

const router = express.Router();

// localhost:271017/api/v1/namaste/getDoctors 

router
.route('/getDoctors')
.get(userController.getAllUsers); // only for the admin gets all the doctor list.

// localhost:271017/api/v1/getDoctors/:id  --> id is the id of the given doctor id will mongo gen id.

router
.route('/getDoctors/:id')
.get(userController.getUser); // only for the admin gets the list for a specific doctor.

// Bundle routes for FHIR data
router
.route('/bundles/upload')
.post(bundleController.uploadBundle); // Upload FHIR bundle

module.exports = router;