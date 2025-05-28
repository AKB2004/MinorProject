// controllers/attendanceController.js
const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
  console.log('[SERVER] POST /checkin body:', req.body);
  try {
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: 'studentId is required' });
    }
    const record = await Attendance.create({ studentId });
    console.log('[SERVER] created record:', record);
    return res.status(201).json(record);
  } catch (err) {
    console.error('[SERVER] checkIn error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getToday = async (_req, res) => {
  console.log('[SERVER] GET /today');
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const records = await Attendance.find({
      timestamp: { $gte: startOfDay },
    }).sort({ timestamp: 1 });
    return res.json(records);
  } catch (err) {
    console.error('[SERVER] getToday error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
