const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const namRouter = require('./Routes/namRouter');

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Simple auth bypass for testing (remove in production)
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path);
  console.log('Headers:', req.headers);
  // Bypass auth for bundle uploads during testing
  if (req.path.includes('/bundles/upload')) {
    console.log('Bypassing auth for bundle upload');
    return next();
  }
  next();
});

app.use(express.json());

// Request logging
app.use(morgan('dev'));

app.use('/api/v1/namaste',namRouter);

module.exports = app;