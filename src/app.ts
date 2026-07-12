import express from 'express';

import { EventRegistry } from './events/event-registry.ts';
import { CorsMiddleware } from './middlewares/cors.middleware.ts';
import { JsonErrorMiddleware } from './middlewares/json-error.middleware.ts';
import { router } from './routes/index.ts';

/**
 * Instância principal da aplicação Express.
 */
const app = express();
app.set('trust proxy', 1);

EventRegistry.registerListeners();

if (CorsMiddleware.enabled) {
	app.use(CorsMiddleware.handle);
}

app.use(express.json({ limit: '100kb' }));
app.use(router);
app.use(JsonErrorMiddleware.handle);

export { app };
