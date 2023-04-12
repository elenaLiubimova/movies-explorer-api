const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный email',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина значения поля - 2 символа, сейчас - {VALUE} символов'],
    maxlength: [30, 'Максимальная длина значения поля - 30 символов, сейчас - {VALUE} символов'],
  },
});

module.exports = mongoose.model('user', userSchema);
