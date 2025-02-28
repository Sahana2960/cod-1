
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const username =process.env.DB_password;
const user_2990066 = process.env.DB_username;

const storage = new GridFsStorage({
    url: `mongodb+srv://user_2990066:123@sampleblog-app.batvk.mongodb.net/?retryWrites=true&w=majority&appName=sampleblog-app`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 