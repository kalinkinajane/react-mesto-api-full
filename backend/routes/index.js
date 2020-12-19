const router = require('express').Router();
const auth = require('../middelewares/auth');
const { createUser, login } = require('../controllers/users');
const users = require('./users.js');
const cards = require('./cards.js');
const {
  checkCreateUser, checkLogin,
} = require('../errors/validations');

router.post('/signup', checkCreateUser, createUser);
router.post('/signin', checkLogin, login);
router.use('/users', auth, users);
router.use('/cards', auth, cards);
module.exports = router;
