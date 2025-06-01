import express from 'express';
import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);

export default app;
