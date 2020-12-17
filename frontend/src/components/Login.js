import React from 'react';


const Login = ({onLogin}) =>{
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
        onLogin(password, email)
        // console.log({ password, email});
    }
return(
    <div className="login">
        <p className="login__title">Вход</p>
        <form onSubmit={handleSubmit} className="login__form" >
          <input value={data.email} onChange={handleChange} className="login__input" id="email" name="email" type="email" placeholder="Email" autoComplete="username" />
          <input value={data.password} onChange={handleChange} className="login__input" autoComplete="current-password" id="password" name="password" type="password" placeholder="Пароль" />
            <button type="submit" className="login__button">Войти</button>
        </form>
    </div>
)
}
export default Login;