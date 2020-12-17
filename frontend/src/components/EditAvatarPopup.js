import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef(null)
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value
    });
    e.target.reset();
  }
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" isOpen={isOpen ? "popup_open" : ""} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input type="url" id="link-avatar" ref={avatarInput} name="avatar" className="popup__input popup__input_type_link-avatar"
          required placeholder="Cсылка на картинку" />
        <span id="link-avatar-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )

}
export default EditAvatarPopup;