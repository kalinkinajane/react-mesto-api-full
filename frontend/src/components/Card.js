import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <div className="place" key={card._id}>
            {isOwn && <button className="place__remove" type="button" aria-label="Удалить" onClick={handleDeleteClick} ></button>}
            <img className="place__image" src={card.link} alt="" onClick={handleClick} />
            <div className="place__text">
                <h2 className="place__title">{card.name}</h2>
                <div className="like">
                    <button className={!isLiked ? "place__like" : "place__like_active"} type="button" aria-label="Нравится" onClick={handleLikeClick} ></button>
                    <span className="place__like-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
