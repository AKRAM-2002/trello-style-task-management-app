import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gptRoutes from './routes/gptRoutes'
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes'; // task routes
import { MONGODB_URI, PORT } from '../config/env'; 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Next.js frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Use routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', gptRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
