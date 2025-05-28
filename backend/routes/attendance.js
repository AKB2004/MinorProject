// routes/attendance.js
const express = require('express');
const { checkIn, getToday } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/checkin', checkIn);
router.get('/today', getToday);

module.exports = router;
