import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins for now
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow all vercel URLs and localhost
    if (
      origin.includes('vercel.app') ||
      origin.includes('localhost') ||
      origin.includes('onrender.com')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all for now
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error caught:', err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    message,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;