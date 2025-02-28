import express from 'express';
import {signupUser,loginUser} from '../controller/user-controller.js';
import { createPost,  getPost, getAllPosts } from '../controller/post-controller.js';
 import { uploadImage, getImage } from '../controller/image-controller.js';

 import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';

import { authenticateToken } from '../controller/jwt-controller.js';


import upload from '../utils/upload.js';
const router = express.Router();


router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/file/upload',uploadImage)

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);


router.post('/create', createPost);
router.post('/create', authenticateToken, createPost);
router.post('/posts',authenticateToken,getAllPosts);
router.post('/post/:id',authenticateToken,getPost)
router.delete('/delete/:id', authenticateToken, deletePost);
router.put('/update/:id', authenticateToken, updatePost);
router.post('/comment/new', authenticateToken, newComment);
router.post('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default  router;