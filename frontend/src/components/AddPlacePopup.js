import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const nameInput = useRef(null)
    const linkInput = useRef(null)
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: nameInput.current.value,
            link: linkInput.current.value
        }
        onAddPlace(data);
        e.target.reset();
    }

    return (
        <PopupWithForm name="add-card" title="Новое место" button="Создать" isOpen={isOpen ? "popup_open" : ""} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__label">
                <input type="text" ref={nameInput} id="place-name" name="name" className="popup__input popup__input_type_place-name"
                    minLength="1" maxLength="30" required placeholder="Название" />
                <span id="place-name-error" className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input type="url" ref={linkInput} id="link" name="link" className="popup__input popup__input_type_link" required
                    placeholder="Cсылка на картинку" />
                <span id="link-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )

}
export default AddPlacePopup;