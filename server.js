import express from 'express';
import postRoutes from './Routes/postRoute.js';
import userRoutes from './Routes/userRoute.js';
import cookieParser from 'cookie-parser';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', postRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(3000, () => {
    console.log(`Server is running on ${3000}`);
})