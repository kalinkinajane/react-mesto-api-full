const { celebrate, Joi } = require('celebrate');

const checkCreateUser = celebrate({
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
  }),
});

const checkUpdateAvatar = celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});
const checkUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});
const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
module.exports = {
  checkCreateUser,
  checkLogin,
  checkCreateCard,
  checkUpdateUser,
  checkUpdateAvatar,
  checkUserId,
  checkCardId,
};
