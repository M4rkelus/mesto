import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__img");
    this._imageCaption = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    super.open();
    this._imageElement.alt = name;
    this._imageElement.src = link;
    this._imageCaption.textContent = name;
  }
}
