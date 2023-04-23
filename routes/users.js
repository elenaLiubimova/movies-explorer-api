const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required(),
    }),
  }),
  auth,
  updateUser,
);

module.exports = router;
