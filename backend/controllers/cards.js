const Card = require('../models/cards');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.body);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданны невалидные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};
