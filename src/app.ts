import express from 'express';

import { EventRegistry } from './events/event-registry.ts';
import { JsonErrorMiddleware } from './middlewares/json-error.middleware.ts';
import { router } from './routes/index.ts';

const app = express();

EventRegistry.registerListeners();

app.use(express.json());
app.use(router);
app.use(JsonErrorMiddleware.handle);

export { app };
