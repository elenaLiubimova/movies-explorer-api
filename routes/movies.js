const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { URL_PATTERN } = require('../config');

router.get('/', auth, getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_PATTERN),
      trailer: Joi.string().required().pattern(URL_PATTERN),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(URL_PATTERN),
      movieId: Joi.string().required(),
    }),
  }),
  auth,
  createMovie,
);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }),
  auth,
  deleteMovie,
);

module.exports = router;
