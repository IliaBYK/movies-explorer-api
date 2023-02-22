import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'jwtmoviesearchingauthorization',
  BASE_PATH: process.env.BASE_PATH || 'mongodb://localhost:27017/moviesearchdb',
};
