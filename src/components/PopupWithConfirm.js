import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-btn");
  }

  renderLoading(isLoading) {
    this._saveButton.disabled = isLoading ? true : false;
    // В макете про текст "Удалить" на кнопке ничего нет, сделал по примеру как на остальных кнопках. Плюс если написать "Удалить" вместо "Удаление..." захочется нажеть еще раз. Поэтому вовсе отключил такую возможность.
    this._saveButton.value = isLoading ? "Удаление..." : "Да";
    isLoading
      ? this._saveButton.classList.add("popup__save-btn_inactive")
      : this._saveButton.classList.remove("popup__save-btn_inactive");
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
