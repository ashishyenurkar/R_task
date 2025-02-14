import express from 'express';
import postRoutes from './Routes/postRoute.js';
import userRoutes from './Routes/userRoute.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use('/api', postRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})