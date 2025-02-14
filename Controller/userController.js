let users = [];
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const COOKIE_OPTIONS = { httpOnly: true, secure: false, sameSite: 'strict' };

export const register = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const newUser = { id: `${Date.now()}`, username, password: hashedPassword };
    users.push(newUser);
  
    res.status(201).json({ message: 'User registered successfully' });
  };
  
  export const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('authToken', token, COOKIE_OPTIONS);
    res.status(200).json({ message: 'Login successful' });
  };
  
  export const logout = async (req, res) => {
    res.clearCookie('authToken', COOKIE_OPTIONS);
    res.status(200).json({ message: 'Logout successful' });
  };
  