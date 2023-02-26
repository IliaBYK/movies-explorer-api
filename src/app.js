import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import helmet from 'helmet';
import { errors as celebrateErrors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { requestLogger, logerErrors } from './middlewares/logger.js';
import limiter from './middlewares/limiter.js';
import unknownErrorHandler from './errorHandlers/unknownErrorHandler.js';
import errorsHandler from './errorHandlers/errorsHandler.js';
import router from './routes/index.router.js';
import config from './utils/config.js';

const app = express();

set('strictQuery', false);
await connect(config.BASE_PATH);
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(json());
app.use('/', router);
app.use(logerErrors);
app.use(celebrateErrors());
app.use(errorsHandler);
app.use(unknownErrorHandler);

app.listen(config.PORT, () => {
  log(`App has been started on port ${config.PORT}...`);
});
