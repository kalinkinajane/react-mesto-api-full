const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => {
        const regExp = /(http || https):\/\/?(www\.)?[-a-zA-Z0-9@:%._/+~#=]{2,}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_/+.~#?&//=]*)/g;
        return regExp.test(value);
      },
      message: 'Введен неверный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log(user);
      console.log(password, user.password);
      if (!user) {
        return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          console.log(matched);
          if (!matched) {
            return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// eslint-disable-next-line func-names
// userSchema.pre('save', function (next) {
//   if (!this.isModified('password')) return next();
//   return bcrypt.hash(this.password, 10)
//     .then((hash) => {
//       this.password = hash;
//       next();
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
