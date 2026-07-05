import express from 'express';

import { JsonErrorMiddleware } from './middlewares/json-error.middleware.ts';
import { router } from './routes/index.ts';

const app = express();

app.use(express.json());
app.use(router);
app.use(JsonErrorMiddleware.handle);

export { app };
