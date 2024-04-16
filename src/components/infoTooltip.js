import React from "react";
import imageCloseIcon from "../image/Close__Icon.png"

const InfoTooltip = ({ isOpen, isSuccess, message }) => {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close-icon" onClick={isOpen}>
          <img
            className="modal__close-icon-img"
            src={imageCloseIcon}
            alt="ìcone para fechar o pop-up"
          />
        </button>
        <div alt="validação" className={`modal__icon ${
            isSuccess ? "modal__icon_success" : "modal__icon_error"
          }`}></div>
        <p
          className={`modal__message ${
            isSuccess ? "modal__message_success" : "modal__message_error"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;