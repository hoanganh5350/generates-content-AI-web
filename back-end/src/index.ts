import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const urlClient = process.env.URL_CLIENT;

app.listen(PORT, () => {
  console.log(`Client running on port ${urlClient}`);
  console.log(`Server running on port ${PORT}`);
});