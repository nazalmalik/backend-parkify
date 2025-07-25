import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import spotRoutes from './routes/spotRoutes.js';
import authRoutes from './routes/authRoutes.js';
import navigationRoutes from './routes/navigationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// ✅ CORS setup with frontend domain
const corsOptions = {
  origin: 'https://parkify-frontend-rouge.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 This line handles preflight OPTIONS requests (MUST HAVE)
app.options('*', cors(corsOptions));

// ✅ Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/spots', spotRoutes);

// ✅ Root Endpoint
app.get('/', (req, res) => {
  res.send('🚗 Smart Parking Backend is running...');
});

// ✅ Error Handler
app.use(errorHandler);

// ✅ MongoDB Connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
