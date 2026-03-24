// ============================================
// SERVER ENTRY POINT
// Sets up Express, connects DB, mounts routes
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --------------- MIDDLEWARE ---------------
// Parse JSON bodies (limit 10mb for resume data)
app.use(express.json({ limit: '10mb' }));

// Enable CORS so our React frontend can talk to this API
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// --------------- ROUTES ---------------
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date() });
});

// --------------- ERROR HANDLING ---------------
app.use(errorHandler);

// --------------- START SERVER ---------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
