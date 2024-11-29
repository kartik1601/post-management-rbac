import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js';
import commonRoute from './routes/commonRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT | 3000;

mongoose.connect(process.env.MONGO_URI);

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET','POST','PUT','DELETE'],
}));

app.use(express.json());

app.use(express.static('public'));

app.use('/api',authRoute);
app.use('/api/admin',adminRoute);
app.use('/api',commonRoute);

app.listen(port, ()=>{
    console.log("Server running on port: "+port);
});