import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 4000,
  JWT_KEY: process.env.JWT_KEY || 'jwtmoviesearchingauthorization',
  BASE_PATH: process.env.BASE_PATH || 'mongodb://127.0.0.1/bitfilmsdb',
};
