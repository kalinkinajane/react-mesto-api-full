import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm name="profile" title="Редактировать профиль" button="Сохранить" isOpen={isOpen ? "popup_open" : ""} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__label">
                <input type="text" id="name" name="name" value={name || ''} className="popup__input popup__input_type_name" minLength="2"
                    maxLength="40" required placeholder="Имя" onChange={handleChangeName} />
                <span id="name-error" className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input type="text" id="about" name="about" value={description || ''} className="popup__input popup__input_type_about" minLength="2"
                    maxLength="200" required placeholder="О себе" onChange={handleChangeDescription} />
                <span id="about-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )

}
export default EditProfilePopup;