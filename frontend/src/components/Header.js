import React from 'react';
import { Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ onSignOut, userData}) {
 
  return (
    <header className="header page__content">
      <img className="header__logo" src={headerLogo} alt="места России" />
      <Route path="/" exact>
        <ul className="header__nav">
          <li className="header__email">{userData.email}</li>
          <li><button className="header__button" onClick={onSignOut}>Выйти</button></li>
        </ul>
      </Route>
      <Route path="/signin" exact>
        <Link to="/signup" className="header__link">Регистрация</Link>
      </Route>
      <Route path="/signup" exact>
        <Link to="/signin" className="header__link">Войти</Link>
      </Route>
    </header>
  );
}

export default Header;
