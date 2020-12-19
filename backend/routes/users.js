const userRouter = require('express').Router();
const {
  getUsers, getUserMe, getUserId, updateUser, updateAvatar,

} = require('../controllers/users');

const {
  checkUpdateUser, checkUpdateAvatar, checkUserId,

} = require('../errors/validations');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);

userRouter.get('/:id', checkUserId, getUserId);
userRouter.patch('/me', checkUpdateUser, updateUser);
userRouter.patch('/me/avatar', checkUpdateAvatar, updateAvatar);

module.exports = userRouter;
