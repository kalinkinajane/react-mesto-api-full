import React from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

const Register = ({onRegister,isOpen, onClose, successfully }) => {
    const [data, setData] = React.useState({
        password: '',
        email: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let { password, email} = data;
        onRegister(password, email)
    }
    return (
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="register__form" >
                <input className="register__input" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email" autoComplete="username" />
                <input className="register__input" value={data.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" placeholder="Пароль" />
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="register__link">&nbsp;Войти</Link>
            </div>
            <InfoTooltip isOpen={isOpen} onClose={onClose} successfully={successfully}/>
        </div>
    )
}
export default Register;