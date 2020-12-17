const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Нет пользователя с таким id'));
      } else {
        next(err);
      }
    });
};
module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Нет пользователя с таким id'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданны невалидные данные'));
            return;
          } if (err.name === 'MongoError') {
            next(new ConflictError('Пользователь с таким email зарегистрирован'));
          } if (err.code === 11000) {
            next(new ConflictError('На данный email раннее был зарегистрирован'));
          }
          next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar },
    { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданны невалидные данные'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Непреданы данные'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданны невалидные данные'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Непреданы данные'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};
