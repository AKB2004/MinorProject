// server.js (root of /backend)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');      // your connectDB helper
const attendanceRoutes = require('./routes/attendance');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // logs success or exits on failure

app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
