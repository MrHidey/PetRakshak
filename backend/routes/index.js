const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Volunteer routes
router.post('/volunteers', controllers.registerVolunteer);
router.post('/rescue-team', controllers.registerRescueteam);



// Rescue case routes
router.post('/report-case', controllers.reportCase);
router.get('/cases', controllers.getCases);

module.exports = router;