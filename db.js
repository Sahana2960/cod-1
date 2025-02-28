
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async (username, password) => {
    const MONGO_URI = `mongodb+srv://${username}:${password}@blog-application.r9g7c.mongodb.net/?retryWrites=true&w=majority&appName=blog-application`;

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(' Database connected successfully');
    } catch (error) {
        console.error(' Error while connecting to the database:', error);
        process.exit(1); // Exit process on failure
    }
};

export default Connection;

