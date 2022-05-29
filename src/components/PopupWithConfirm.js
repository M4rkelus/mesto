import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler.bind(this);
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-btn");
  }

  open(cardId, deleteMethod) {
    super.open();
    this._cardId = cardId;
    this._deleteMethod = deleteMethod;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._cardId, this._deleteMethod);
      this._saveButton.value = "Удаление...";
    });
  }
}
