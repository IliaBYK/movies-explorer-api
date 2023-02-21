import { Joi, celebrate } from 'celebrate';
import { regExp } from '../utils/constants.js';

export const userValidationMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

export const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().regex(regExp),
    trailerLink: Joi.string().required().uri().regex(regExp),
    thumbnail: Joi.string().required().uri().regex(regExp),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
});

export const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});
