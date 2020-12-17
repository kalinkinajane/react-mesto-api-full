const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        const regExp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
        return regExp.test(value);
      },
      message: 'Введен неверный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;
