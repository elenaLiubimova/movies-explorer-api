const router = require('express').Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', signinRouter);
router.use('/', signupRouter);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
