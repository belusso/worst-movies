import express, { Application } from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/routes';

const app: Application = express();

app.use(bodyParser.json());
app.use('/', movieRoutes);

export default app;