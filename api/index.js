const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('../routes/authRoutes');
const bookingRoutes = require('../routes/bookingRoutes');
const navigationRoutes = require('../routes/navigationRoutes');
const spotRoutes = require('../routes/spotRoutes');

const app = express();

// ✅ CORS setup for Vercel serverless
const corsOptions = {
  origin: 'https://parkify-frontend-rouge.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/spots', spotRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🚗 Smart Parking Backend (Serverless) is running...');
});

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
