const mongoose = require('mongoose');
const { URL_PATTERN } = require('../config');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_PATTERN.test(url),
      message: 'Невалидная ссылка',
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_PATTERN.test(url),
      message: 'Невалидная ссылка',
    },
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_PATTERN.test(url),
      message: 'Невалидная ссылка',
    },
  },

  movieId: {
    type: Number,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
