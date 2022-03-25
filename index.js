// Data
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* Elements */
const page = document.querySelector(".page");
const gallery = document.querySelector(".elements");

// Profile
const profileName = document.querySelector(".profile__title"),
  profileJob = document.querySelector(".profile__subtitle"),
  editBtn = document.querySelector(".profile__edit-btn"),
  addBtn = document.querySelector(".profile__add-btn");

// Profile popup
const profileEditPopup = document.querySelector(".popup_profile-edit"),
  popupForm = document.querySelector(".popup__form"),
  nameInput = document.querySelector(".popup__field_value_name"),
  jobInput = document.querySelector(".popup__field_value_job"),
  closeBtn = document.querySelector(".popup__close-btn");

// Card add popup
const cardAddPopup = document.querySelector(".popup_card-add"),
  cardAddPopupForm = document.querySelector(".popup__form_card-add"),
  cardNameInput = document.querySelector(".popup__field_value_card-name"),
  cardLinkInput = document.querySelector(".popup__field_value_card-link"),
  cardAddCloseBtn = cardAddPopup.querySelector(".popup__close-btn");

/* Functions */
const createCard = function (name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__delete-btn")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-btn")
    .addEventListener("click", toggleLike);
  cardElement
    .querySelector(".card__img")
    .addEventListener("click", openCardPreviewPopup);

  return cardElement;
};

const addCard = function (e) {
  e.preventDefault();
  if (!cardNameInput.value || !cardLinkInput.value) return;

  gallery.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closeCardAddPopup();
  cardNameInput.value = "";
  cardLinkInput.value = "";
};

const deleteCard = function (e) {
  e.target.closest(".card").remove();
};

const renderCards = function (data) {
  data.map((el) => {
    gallery.append(createCard(el.name, el.link));
  });
};

const renderCardPreveiwPopup = function (e) {
  const cardPopupTemplate = document.querySelector("#popup").content;
  const cardPopupElement = cardPopupTemplate
    .querySelector(".popup_card-preview")
    .cloneNode(true);

  cardPopupElement.querySelector(".popup__img").src =
    e.target.closest(".card__img").src;
  cardPopupElement.querySelector(".popup__img").alt = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  cardPopupElement.querySelector(".popup__caption").textContent =
    e.target.closest(".card__img").alt;
  cardPopupElement
    .querySelector(".popup__close-btn")
    .addEventListener("click", closeCardPreviewPopup);
  page.append(cardPopupElement);
};

const openCardPreviewPopup = function (e) {
  renderCardPreveiwPopup(e);
  const cardPreviews = document.querySelectorAll(".popup_card-preview");

  cardPreviews.forEach((card) => {
    const popupImgSrc = card.querySelector(".popup__img").src;
    if (popupImgSrc == e.target.src) {
      card.classList.add("popup_opened_preview");
      setTimeout(() => {
        document.querySelector(".popup_opened_preview").style.opacity = "1";
      });
    }
  });
};

const closeCardPreviewPopup = function (e) {
  e.target.closest(".popup_opened_preview").style.opacity = "0";
  setTimeout(() => {
    e.target.closest(".popup").remove();
  }, 300);
};

const openPopup = function () {
  profileEditPopup.classList.add("popup_opened");
  document.querySelector(".popup_opened").style.opacity = "1";
};

const closePopup = function () {
  document.querySelector(".popup_opened").style.opacity = "0";
  setTimeout(() => {
    profileEditPopup.classList.remove("popup_opened");
  }, 300);
};

const openCardAddPopup = function () {
  cardAddPopup.classList.add("popup_opened");
  document.querySelector(".popup_opened").style.opacity = "1";
};

const closeCardAddPopup = function () {
  document.querySelector(".popup_opened").style.opacity = "0";
  setTimeout(() => {
    cardAddPopup.classList.remove("popup_opened");
  }, 300);
};

const toggleLike = function (e) {
  e.target.classList.toggle("card__like-btn_active");
};

const saveProfile = function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
};

const editProfile = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup();
};

const registerPopupEventsListeners = function () {
  editBtn.addEventListener("click", editProfile);
  closeBtn.addEventListener("click", closePopup);
  popupForm.addEventListener("submit", saveProfile);
  addBtn.addEventListener("click", openCardAddPopup);
  cardAddCloseBtn.addEventListener("click", closeCardAddPopup);
  cardAddPopupForm.addEventListener("submit", addCard);
};

const init = function () {
  renderCards(initialCards);
  registerPopupEventsListeners();
};
init();
