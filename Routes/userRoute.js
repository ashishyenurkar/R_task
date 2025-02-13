import express from 'express';
import { login, logout, register } from '../Controller/userController.js';

const router = express.Router();

// Route to get all posts
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;