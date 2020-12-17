const { celebrate, Joi } = require('celebrate');

const checkСreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

const checkCreateCard = celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
});

const checkUpdateUser = celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const checkUpdateAvatar = celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});
module.exports = {
  checkСreateUser, checkLogin, checkCreateCard, checkUpdateUser, checkUpdateAvatar,
};
