import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import helmet from 'helmet';
import { errors as celebrateErrors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { requestLogger, logerErrors } from './src/middlewares/logger.js';
import limiter from './src/middlewares/limiter.js';
import unknownErrorHandler from './src/errorHandlers/unknownErrorHandler.js';
import errorsHandler from './src/errorHandlers/errorsHandler.js';
import router from './src/routes/index.router.js';
import config from './src/utils/config.js';

const app = express();

const allowedCors = [
  'http://localhost:3000',
  'http://bitfilms.ibyk.nomoredomainsclub.ru',
  'https://bitfilms.ibyk.nomoredomainsclub.ru',
];

set('strictQuery', false);

await connect(config.BASE_PATH);

app.use(json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
});
app.use('/', router);
app.use(logerErrors);
app.use(celebrateErrors());
app.use(errorsHandler);
app.use(unknownErrorHandler);

app.listen(config.PORT, () => {
  log(`App has been started on port ${config.PORT}...`);
});
