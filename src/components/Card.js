export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = data.userId;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__img");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-btn");
    this._cardLikeCounter = this._cardElement.querySelector(
      ".card__like-counter"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._userId !== this._owner._id && this._cardDeleteBtn.remove();

    this._updateLikesView();
    this._setEventListeners();

    return this._cardElement;
  }

  _isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _updateLikesView() {
    this._cardLikeCounter.textContent = this._likes.length;
    this._isLiked()
      ? this._cardLikeBtn.classList.add("card__like-btn_active")
      : this._cardLikeBtn.classList.remove("card__like-btn_active");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  toggleLike(cardData) {
    this._likes = cardData.likes;
    this._updateLikesView();
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () =>
      this._handleLikeClick(this._isLiked(), this._cardId)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
    this._cardDeleteBtn.addEventListener("click", () =>
      this._handleDeleteClick(this._cardId)
    );
  }
}
