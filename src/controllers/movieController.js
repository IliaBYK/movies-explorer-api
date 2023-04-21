import { Console } from 'winston/lib/winston/transports/index.js';
import Movie from '../models/movie.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import { NOT_FOUND_MOVIE_MESSAGE, FORBIDDEN_MESSAGE } from '../utils/constants.js';
import { CREATED_CODE } from '../utils/errorsCodes.js';

const console = new Console();

export async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
}

export async function postMovie(req, res, next) {
  try {
    let movie = new Movie({ ...req.body, owner: req.user._id });
    await movie.save();
    movie = await movie.populate('owner');
    res.status(CREATED_CODE).send(movie);
  } catch (err) {
    next(err);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.id).populate('owner');
    if (movie === null) {
      throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
    }
    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    }
    console.log(req.user, movie.owner);
    await movie.delete();
    res.send(movie);
  } catch (err) {
    next(err);
  }
}
