import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Editar Perfil"
      name="popup"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__form-inputs">
          <input
            required
            type="text"
            value={name}
            minLength={2}
            maxLength={40}
            name="nome"
            id="nome"
            className="popup__form-input popup__form-name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <span className="popup__form" id="span-input-name"></span>
        </div>

        <div className="popup__form-inputs">
          <input
            required
            type="text"
            value={about}
            name="job"
            id="job"
            className="popup__form-input popup__form-job"
            minLength="2"
            maxLength="200"
            onChange={(event) => {
              setAbout(event.target.value);
            }}
          />
          <span className="popup__form" id="span-input-job"></span>
        </div>
      </>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
