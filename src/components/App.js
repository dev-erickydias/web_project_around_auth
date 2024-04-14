import { useState, useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api.js';
import { BrowserRouter as Router, Route, Routes/*, useNavigate*/ } from 'react-router-dom';
import Login from './login.js';
import Register from './register.js';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from "./AddPlacePopup.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import ImagePopup from "./ImagePopup";
//import ProtectedRouter from './ProtectedRouter.js';
//import * as auth from "../utils/auth.js"


function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  })
  //const [useEmail, setUseEmail] = useState()
 // const [isLoggedIn, setIsLoggedIn] = useState()
 // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
 // const [isSuccess, setIsSuccess] = useState(false)

 

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    api
      .getInitialCards()
      .then(setCards)
      .catch((error) =>console.error('Erro ao buscar dados dos cartões:', error));
  }, [])
  const handleUpdateUser = (userData) => {
    api
      .editProfile(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (userData) => {
    console.log(userData)
    api
      .editAvatar(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleCreateNewCard = (newCardData) => {
    api
      .createNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) => console.log(error));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setselectedCard(null);
  };

  return (
    <>
      <currentUserContext.Provider value={currentUser}>
        <Header />
        <Router>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/"
              element={
                <Main
                  cards={cards}
                  onEditAvatarClick={() => {
                    setEditAvatarPopupOpen(true);
                  }}
                  onEditProfileClick={() => {
                    setEditProfilePopupOpen(true);
                  }}
                  onAddPlaceClick={() => {
                    setAddPlacePopupOpen(true);
                  }}
                  onCardClick={(card) => {
                    setselectedCard(card);
                  }}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>
        </Router>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleCreateNewCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </currentUserContext.Provider>
    </>
  );
}

export default App;
