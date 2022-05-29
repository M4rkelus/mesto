export default class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
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
    this._cardLikeCounter.textContent = this._likes.length;
    this._userId !== this._owner._id ? this._cardDeleteBtn.remove() : null;
    this._likes.some((item) => item._id === this._userId)
      ? this._cardLikeBtn.classList.add("card__like-btn_active")
      : this._cardLikeBtn.classList.remove("card__like-btn_active");

    this._setEventListeners();

    return this._cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleLike() {
    this._handleLikeClick(
      this._likes.some((item) => item._id === this._userId),
      this._cardId
    )
      .then((card) => {
        this._likes = card.likes;
        this._cardLikeCounter.textContent = card.likes.length;
        this._cardLikeBtn.classList.toggle("card__like-btn_active");
      })
      .catch((err) => console.error(err));
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => this._toggleLike());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
    this._cardDeleteBtn.addEventListener("click", () =>
      this._handleDeleteClick(this._cardId, () => this._deleteCard())
    );
  }
}
