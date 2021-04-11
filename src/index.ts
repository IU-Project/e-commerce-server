import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { logger } from '@modules/logger';
import { registerRouter } from '@routers';
import { handler } from '@app/exceptions/handler';

// Init app
const app = express();

// Use cookie
app.use(cookieParser());

// Logger
logger.applyFor(app);

// Security
app.use(cors());
app.use(helmet());

// Return only json
app.use(express.json());

// Set static files
app.use(express.static('public'));

// Set up routes
registerRouter(app);

// Handle exceptions
handler.handleFor(app);

export { app };