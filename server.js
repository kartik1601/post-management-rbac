import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import authRoute from './routes/authRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT | 3000;

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

app.use(express.static('public'));

app.use('/api',authRoute);

app.listen(port, ()=>{
    console.log("Server running on port: "+port);
});