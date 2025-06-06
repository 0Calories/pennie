import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from './generated/prisma';
import routes from './routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
