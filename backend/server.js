import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
const port = process.env.PORT || 5001;
import { handleError, notFound } from './middleware/errorhandling.js';
import cookieParser from 'cookie-parser';

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser()); 

app.use('/api/users',userRoutes);
app.get('/' , (req , res) => res.send("express server ready"));

app.use(notFound);
app.use(handleError);

app.listen(port , () => console.log('server is ready' , port));
