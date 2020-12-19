const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  checkCreateCard,
  checkCardId,
} = require('../errors/validations');

cardRouter.get('/', getCards);
cardRouter.post('/', checkCreateCard, createCard);
cardRouter.delete('/:cardId', checkCardId, deleteCard);
cardRouter.put('/:cardId/likes', checkCardId, likeCard);
cardRouter.delete('/:cardId/likes', checkCardId, dislikeCard);

module.exports = cardRouter;
