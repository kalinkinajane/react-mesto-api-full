import React from 'react';


function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_type_view ${Object.keys(card).length > 0 ? "popup_open" : ""}`} >
            <div className="popup__container-view">
                <button className="popup__close popup__close_view" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure>
                    <img className="popup__image" src={card.link} alt="изображение" />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;
