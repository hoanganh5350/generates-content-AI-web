import express from 'express';
import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);

export default app;
