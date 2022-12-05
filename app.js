import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';
import mongoose, { mongo } from 'mongoose';
import path from 'path';
import colors from 'colors';
import userRouter from './routes/user.router.js';
import courseRouter from './routes/course.route.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotEnv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json()); //to accept json DATA
const port = process.env.PORT || 8800;

app.use('/images/user', express.static(path.join(__dirname, '/images/user')));
app.use(
  '/images/course',
  express.static(path.join(__dirname, '/images/course'))
);

app.use('/', userRouter);
app.use('/', courseRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`.yellow.bold);
});
