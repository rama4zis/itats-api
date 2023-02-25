import express from 'express';
import { notFound } from './middleware/404';
import { errorHandler } from './middleware/errorHandler';

import UserRouter from './app/User/Route';

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.use('/api/', UserRouter)

app.use(notFound);
app.use(errorHandler)

app.listen(port, (): void => {
    console.log(`Server running on port ${port}`);
});