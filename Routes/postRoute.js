import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../Controller/postController.js';
import { authenticateUser } from '../middelware/auth.js';

const router = express.Router();

// Route to get all posts
router.get("/get-posts", getPosts);

// Route to get a post by ID
router.get("/get-post/:id", getPostById);

// Route to create a new post
router.post("/create-post",authenticateUser, createPost);

// Route to update a post by ID
router.put("/update-post/:id",authenticateUser, updatePost);

// Route to delete a post by ID
router.delete("/delete-post/:id",authenticateUser, deletePost);

export default router;
