import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import helmet from 'helmet';
import { errors as celebrateErrors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { requestLogger, logerErrors } from './src/middlewares/logger.js';
import limiter from './src/middlewares/limiter.js';
import unknownErrorHandler from './src/errorHandlers/unknownErrorHandler.js';
import errorsHandler from './src/errorHandlers/errorsHandler.js';
import router from './src/routes/index.router.js';
import config from './src/utils/config.js';

const app = express();

const whitelist = [
  'http://localhost:3000',
  'http://bitfilms.ibyk.nomoredomainsclub.ru',
  'https://bitfilms.ibyk.nomoredomainsclub.ru',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

set('strictQuery', false);

await connect(config.BASE_PATH);

app.use(json());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use('/', router);
app.use(logerErrors);
app.use(celebrateErrors());
app.use(errorsHandler);
app.use(unknownErrorHandler);

app.listen(config.PORT, () => {
  log(`App has been started on port ${config.PORT}...`);
});
