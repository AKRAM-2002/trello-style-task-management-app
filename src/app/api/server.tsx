import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from '../../../src/config/env';
import cors from 'cors';


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend's URL
  methods: ['GET', 'POST'], // Specify allowed methods
}));

app.use(express.json());

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// API routes will be added here

app.get('/api/test', (_req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;