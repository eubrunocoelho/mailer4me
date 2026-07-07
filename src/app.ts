import express from 'express';

import { EventRegistry } from './events/event-registry.ts';
import { CorsMiddleware } from './middlewares/cors.middleware.ts';
import { JsonErrorMiddleware } from './middlewares/json-error.middleware.ts';
import { router } from './routes/index.ts';

const app = express();

EventRegistry.registerListeners();

app.use(CorsMiddleware.handle);
app.use(express.json({ limit: '10kb' }));
app.use(router);
app.use(JsonErrorMiddleware.handle);

export { app };
