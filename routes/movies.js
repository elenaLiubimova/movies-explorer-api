const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

router.get('/', getMovies);

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
      thumbnail: Joi.string().required().pattern(URL_PATTERN),
      movieId: Joi.string().hex().length(24).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;