const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { OK_STATUS } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => bcrypt
  .hash(req.body.password, 10)
  .then((hash) => User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  }))
  .then((user) => res.status(OK_STATUS).send({
    name: user.name,
    email: user.email,
    _id: user._id,
  }))
  .catch((error) => {
    if (error.code === 11000) {
      return next(
        new ConflictError('Пользователь с таким email уже зарегистрирован'),
      );
    }
    if (error.name === 'ValidationError') {
      return next(
        new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        ),
      );
    }
    return next(error);
  });

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Ошибка доступа');
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Ошибка доступа'));
      }
      return user;
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'app-secret',
        {
          expiresIn: '7d',
        },
      );
      return res.send({ jwt: token });
    })
    .catch((error) => {
      next(error);
    });
};

const getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((error) => next(error));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(OK_STATUS).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
};
