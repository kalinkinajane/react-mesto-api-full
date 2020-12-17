const userRouter = require('express').Router();
const {
  getUsers, getUserMe, getUserId, updateUser, updateAvatar,

} = require('../controllers/users');

const {
  checkUpdateUser, checkUpdateAvatar,
} = require('../errors/validations');

userRouter.get('/users', getUsers);
userRouter.get('/me', getUserMe);

userRouter.get('/:id', getUserId);
userRouter.patch('/me', checkUpdateUser, updateUser);
userRouter.patch('/me/avatar', checkUpdateAvatar, updateAvatar);

module.exports = userRouter;
