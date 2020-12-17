const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  checkCreateCard,
} = require('../errors/validations');

cardRouter.get('/', getCards);
cardRouter.post('/', checkCreateCard, createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/likes/:cardId', likeCard);
cardRouter.delete('/likes/:cardId', dislikeCard);

module.exports = cardRouter;
