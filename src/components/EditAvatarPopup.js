import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarReference = useRef("");
    useEffect(() => {
      if (!isOpen) {
        avatarReference.current = "";
      }
    }, [isOpen]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      onUpdateAvatar({
        avatar: avatarReference.current
      });
      avatarReference.current = e.target[0].value;
      
    };
  
    return (
        <PopupWithForm isOpen={isOpen} title="Alterar a foto do perfil" name="popup_edit" onClose={onClose} onSubmit={handleSubmit}>
        <label>
          <input id="avatar-input" placeholder="Link da Imagem" type="url" className="popup__form-name popup__form-input_avatar" name="image" required />
          <span className="popup__form" id="span-input-add-image"></span>
        </label>
        </PopupWithForm>
    )}

export default EditAvatarPopup