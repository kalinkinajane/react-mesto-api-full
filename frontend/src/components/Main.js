import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
            <section className="profile page__content">
                <div className="profile__edit-avatar" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="#" />
                </div>
                <div className="profile__info">
                    <div className="profile__conteiner">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__button-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
            </section>
            <div className="places page__content">
                {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
            </div>
        </>
    )
}

export default Main;


