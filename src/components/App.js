import { useState, useEffect } from "react";
import EditAvatarPopup from "./EditAvatarPopup.js"
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/api.js";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import { Route } from 'react-router-dom';
import Login from "./login";
import Register from "./register";
import * as auth from "../utils/auth.js";
import { BrowserRouter, Switch } from "react-router-dom/cjs/react-router-dom.min.js";
import ProtectedRoute from "./ProtectedRouter";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") ? true : false
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail")
  );
  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          setUserEmail(localStorage.getItem("userEmail"));
        })
        .catch((error) => {
          console.error("Erro ao verificar token:", error);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
    
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch((error) => console.log(error));

    api
      .getInitialCards()
      .then(setCards)
      .catch((error) => {
        console.error("Erro ao buscar dados dos cartões:", error);
      });
  }, []);
  
  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    
  };
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
          state.map((c) => (c._id === card._id ? newCard : c))
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
    <BrowserRouter>
      <currentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <ProtectedRoute path="/"  loggedIn={loggedIn}>
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
              loggedIn={loggedIn} userEmail={userEmail} handleLogout={handleLogout}
            />
          </ProtectedRoute>
        </Switch>
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
        <Footer />
      </currentUserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
