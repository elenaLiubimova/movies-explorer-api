const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const { OK_STATUS, CREATED_STATUS } = require('../config');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id.toString() })
  .populate('owner')
  .then((movies) => res.status(OK_STATUS).send(movies))
  .catch((error) => next(error));

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма',
          ),
        );
      }
      return next(error);
    });
};

const deleteMovie = (req, res, next) => Movie.findById(req.params._id)
  .orFail(() => next(new NotFoundError('Фильм не найден')))
  .then((movie) => {
    if ((movie.owner).toString() !== req.user._id.toString()) {
      return next(new ForbiddenError('Отказано в доступе'));
    }
    return Movie.findByIdAndRemove(req.params._id)
      .then((movieData) => {
        res.send({ movieData });
      })
      .catch((err) => {
        next(err);
      });
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return next(
        new BadRequestError(
          'Переданы некорректные данные при удалении фильма',
        ),
      );
    }
    return next(error);
  });

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
