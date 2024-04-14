import Card from './Card.js';
import edtImage from '../image/Lapiz__icon.png';
import addImage from '../image/add__icon.png';

function Main({
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <div className="profile_edit__conetener">
            <img
              onClick={onEditAvatarClick}
              className="profile__image opacursor"
              alt="profile"
            />
          </div>

          <div className="profile__titles">
            <div className="profile__content">
              <button
                onClick={onEditProfileClick}
                className="profile__button opacursor abrir"
              >
                <img src={edtImage} className="edit" alt="icone de um lapiz" />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="button profile__button-add opacursor abrir"
        >
          <img
            src={addImage}
            alt="simbolo de adição"
            className="button__icon"
          />
        </button>
      </section>
      <ul className="cards">
        {cards.map((card) => (
          <Card
            cardData={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
      <section className="popup popup_delete">
        <div className="popup__container popup__container_delete">
          <button type="button" className="popup__close-icon">
            <img
              className="popup__close-icon-img"
              src="./images/close-icon.png"
              alt="fechar o pop-up"
            />
          </button>
          <h2 className="popup__title">Tem certeza?</h2>
          <button type="button" className="popup__button-submit">
            Sim
          </button>
        </div>
      </section>
    </>
  );
}
export default Main;
