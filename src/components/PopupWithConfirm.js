import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-btn");
  }

  renderLoading(isLoading) {
    this._saveButton.disabled = isLoading ? true : false;
    this._saveButton.value = isLoading ? "Удаление..." : "Да";
  }

  setSubmit(submitCallback) {
    this._submitHandler = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
    });
  }
}
