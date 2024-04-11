import closeIcon from "../image/Close__Icon.png"

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? 'popup_opened' : ''}`}>
      <div className="overlay" id="overlay-image"></div>
      <div className="popup-container">
        <div className="popup__image">
        <div className="close-image">
          <img src={closeIcon} alt="Botão que feixa a caixa de edição" onClick={onClose} />
        </div>
          <img className="popup-container__image popup-container__image_card" id="popup-image" src={card?.link} alt={card?.name} />
          <span className="popup__container-name">{card ? card.name : ''}</span>
        </div>
        
      </div>
    </div>
  );
}

export default ImagePopup;
