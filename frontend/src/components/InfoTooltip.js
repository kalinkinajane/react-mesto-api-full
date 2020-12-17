import React from 'react';
import successLogo from '../images/success-logo.png';
import failLogo from '../images/fail-logo.png';

const InfoTooltip = ({ isOpen, onClose, successfully }) => {
    return (<div>
        { successfully ? (<div className={`popup popup_type_info  ${isOpen && 'popup_open'}`}>
            <div className="popup__conteiner">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image-info" src={successLogo} alt="Ecgtiyfz htubcnhfwbz" />
                <p className="popup__title-info">Вы успешно зарегистрировались!</p>

            </div>
        </div>)
            : (<div className={`popup popup_type_info ${isOpen && 'popup_open'}`}>
                <div className="popup__conteiner">
                    <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
                    <img className="popup__image-info" src={failLogo} alt="Ошибка регистрации" />
                    <p className="popup__title-info">Что-то пошло не так! Попробуйте еще раз.</p>
                </div>
            </div>)
        }
    </div>
    )
}

export default InfoTooltip;