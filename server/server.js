import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
