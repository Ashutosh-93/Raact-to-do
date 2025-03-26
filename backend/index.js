import express from "express"
import cors from "cors"
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
};
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cookieParser()); 

  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);

  app.listen(port, ()=>{
    console.log("server running at pro ", port);
connectDB();})
