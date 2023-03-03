import express from 'express';
import cors from 'cors';
import contents_controllers from './controllers/contents_controllers.js';

const app = express();

app.use(express.json());
app.use(cors());

contents_controllers.routes(app);

export default app;
