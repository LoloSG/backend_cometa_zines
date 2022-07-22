const router = require('express').Router();

const { checkToken } = require('../helpers/middlewares');

const newApiRouter = require('./api/new')
const usersApiRouter = require('./api/users')


router.use('/new', newApiRouter);
router.use('/users', checkToken, usersApiRouter);


module.exports = router;