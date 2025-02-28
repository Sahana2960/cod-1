import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from './database/db.js'; //  Import the Connection function
import userRoutes from './routes/userRoutes.js'; // Import user routes
import Routes from "./routes/route.js";
dotenv.config();

const app = express();

//  Middleware to parse JSON request bodies
app.use(cors());
app.use(bodyParser.json()); // Needed for parsing JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Another way to parse JSON

//  Routes
app.use('/user', userRoutes);
const PORT =  8000;

//  Retrieve DB credentials from .env
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Connect to MongoDB
Connection(username, password);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
