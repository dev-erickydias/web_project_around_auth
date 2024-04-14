import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from "react";
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
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            required
            type="text"
            minLength={2}
            maxLength={40}
            name="nome"
            id="nome"
            className="popup__form-input popup__form-name"
          />
          <span className="popup__form" id="span-input-name"></span>
        </div>

        <div className="popup__form-inputs">
          <input
            required
            type="text"
            name="job"
            id="job"
            value={about}
            onChange={(event) => {
              setAbout(event.target.value)}}
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
export default EditProfilePopup;
