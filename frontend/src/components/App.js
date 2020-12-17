import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/authorization.js'


function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });
  const [isInfoTooltipOpenClose, setIsInfoTooltipOpenClose] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck()
  }, []);
  function handleInfoTooltipOpenClose() {
    setIsInfoTooltipOpenClose(true)
  }
  function handleInfoTooltipClose() {
    setIsInfoTooltipOpenClose(false);
    history.push('/signin');
  }

  // регистрация
  const onRegister = (password, email) => {
    auth.register(password, email)
      .then(data => {
        handleInfoTooltipOpenClose();
        setUserData({
          email: data.email,
          password: data.password
        })
        setLoggedIn(true)
        //  history.push('/signin')
      })
      .catch(err => {
        handleInfoTooltipOpenClose();
        console.error(err);
      })
  }
  // авторизация
  const onLogin = (password, email) => {
    auth.authorize(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setUserData({
            email: data.email,
            password: data.password
          })
          setLoggedIn(true);
          history.push('/')
        }
      })
      .catch(err => {
        if (err === 400) {
          console.log('Не передано одно из полей')
        } else if (err === 401) {
          console.log('Пользователь с email не найден')
        }
        console.error(err)
      })
  }
  //выход
  const onSignOut = () => {
    const jwt = localStorage.removeItem('jwt')
    setUserData({
      email: ''
    })
    setLoggedIn(false);
  }
  // проверка токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res.email) {
            setUserData({
              email: res.email
            })
            setLoggedIn(true);
            history.push('/')
          }

        })
        .catch(err => {
          if (err === 401) {
            console.log('Токен не передан или передан не в том формате')
          }
          console.log('Переданный токен некорректен')
        })
    }
  };
  // Загрузка начальных данных
  React.useEffect(() => {
    api.getAllNeedData().then(([cardData, userData]) => {

      setCurrentUser(userData);
      setCards(cardData)
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  // Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api.addnewCard(data).then((newCard) => {
      console.log(newCard.card)
      setCards([newCard.card, ...cards])
    }).then(() => {
      closeAllPopups()
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  // Редактирование профиля
  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about }).then((newUserData) => {
      setCurrentUser(newUserData);
    }).then(() => {
      closeAllPopups()
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  // Редактирование аватара
  function handleUpdateAvatar({ avatar }) {
    api.editAvatar({ avatar }).then((newAvatar) => {
      setCurrentUser(newAvatar);
    }).then(() => {
      closeAllPopups()
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  // Лайк карточек
  function handleCardLike(card) {
    console.log(card.likes);
    console.log(card);
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.toggleLikes(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard.card : c);
      setCards(newCards);
      console.log(newCards);
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  // Удаление карточки
  const [cardForDelete, setCardForDelete] = React.useState();
  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.removeCard(cardForDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardForDelete._id)
      setCards(newCards);
      setIsDeleteCardPopupOpen(false);
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsDeleteCardPopupOpen(false);
    setCardForDelete(undefined);
    setIsInfoTooltipOpenClose(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header onSignOut={onSignOut} userData={userData} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDeleteRequest} />
          <Route path="/signup">
            <Register onRegister={onRegister} isOpen={isInfoTooltipOpenClose} onClose={handleInfoTooltipClose} successfully={loggedIn} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} tokenCheck={tokenCheck} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Route path="/" exact>
          <Footer />
        </Route>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm isOpen={isDeleteCardPopupOpen} onSubmit={handleCardDelete} onClose={closeAllPopups} name="delete" title="Вы уверены?" button="Да"></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>

  );
}
export default App;
