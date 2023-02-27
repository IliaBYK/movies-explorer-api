import { Joi, celebrate } from 'celebrate';
import { regExp } from '../utils/constants.js';

export const userValidationMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

export const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().regex(regExp),
    trailerLink: Joi.string().required().uri().regex(regExp),
    thumbnail: Joi.string().required().uri().regex(regExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

export const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

export const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
