import express from 'express';
import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const urlClient = process.env.URL_CLIENT;

const app = express();

app.use(cors({
  origin: urlClient ?? 'http://localhost:5173',
  credentials: true, // cần thiết để gửi cookie
}))

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);

export default app;
