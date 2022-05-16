export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-btn");
  }

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  _handleEscClose(e) {
    if (e.key !== "Escape") return;
    this.close();
  }

  _handlePopupOverlayClick(e) {
    if (e.target === e.currentTarget) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (e) =>
      this._handlePopupOverlayClick(e)
    );
  }
}
