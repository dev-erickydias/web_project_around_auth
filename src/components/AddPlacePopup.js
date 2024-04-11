import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
    setName("");
    setLink("");
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Novo Local"
      name="popup-add"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__form-inputs">
          <input
            name="name"
            minLength={2}
            maxLength={30}
            required=""
            id="title-input"
            placeholder="Título"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="popup__form-input popup__form-name"
          />
          <span className="popup__form" id="span-input-name"></span>
        </div>

        <div className="popup__form-inputs">
          <input
            required
            type="url"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
            name="job"
            id="job"
            className="popup__form-input popup__form-job"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__form" id="span-input-job"></span>
        </div>
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;