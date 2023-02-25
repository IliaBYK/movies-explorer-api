import express, { json, urlencoded } from 'express';
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
import { INTERNAL_SERVER_ERR_CODE } from './utils/errorsCodes.js';
import { INTERNAL_MESSAGE } from './utils/constants.js';
import config from './utils/config.js';

const app = express();

app.use(urlencoded({ extended: true }));

async function startApp() {
  try {
    set('strictQuery', false);
    await connect(config.BASE_PATH);
    app.use(cookieParser());
    app.use(requestLogger);
    app.use(logerErrors);
    app.use(limiter);
    app.use(json());
    app.use(helmet());
    app.use('/', router);
    app.use(celebrateErrors());
    app.use(errorsHandler);
    app.use(unknownErrorHandler);
  } catch (err) {
    if (err) {
      app.use((req, res) => {
        res.status(INTERNAL_SERVER_ERR_CODE).send({ message: INTERNAL_MESSAGE });
      });
    }
  }
}

startApp();

app.listen(config.PORT, () => {
  log(`App has been started on port ${config.PORT}...`);
});
