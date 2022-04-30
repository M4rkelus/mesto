import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

/* Data */
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

const VALIDATION_CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};

/* Elements */
const gallery = document.querySelector(".elements");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupList = Array.from(document.querySelectorAll(".popup"));
// Profile popup
const profilePopup = document.querySelector(".popup_profile");
const profileForm = profilePopup.querySelector(".popup__form_profile");
const profileNameInput = profilePopup.querySelector(".popup__field_value_name");
const profileJobInput = profilePopup.querySelector(".popup__field_value_job");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileCloseBtn = profilePopup.querySelector(".popup__close-btn_profile");
// Card popup
const cardPopup = document.querySelector(".popup_card");
const cardForm = cardPopup.querySelector(".popup__form_card");
const cardNameInput = cardPopup.querySelector(".popup__field_value_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__field_value_card-link");
const cardAddBtn = document.querySelector(".profile__add-btn");
const cardCloseBtn = cardPopup.querySelector(".popup__close-btn_card");
// Image preview popup
const previewPopup = document.querySelector(".popup_preview");
const previewImage = previewPopup.querySelector(".popup__img");
const previewCaption = previewPopup.querySelector(".popup__caption");
const previewCloseBtn = previewPopup.querySelector(".popup__close-btn");
// Form validators
const profileFromValidator = new FormValidator(VALIDATION_CONFIG, profileForm);
const cardFromValidator = new FormValidator(VALIDATION_CONFIG, cardForm);

// Functions
const renderCards = function (data) {
  data.map((el) => {
    gallery.append(new Card(el, "#card", showCardPreview).createCard());
  });
};

const addCard = function (e) {
  e.preventDefault();
  gallery.prepend(
    new Card(
      { name: cardNameInput.value, link: cardLinkInput.value },
      "#card",
      showCardPreview
    ).createCard()
  );
  cardForm.reset();
  cardFromValidator.resetValidator();

  closePopup(cardPopup);
};

const openPopup = function (popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", handleEscKeydown);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", handleEscKeydown);
};

const handlePopupOverlayClick = function (e, popup) {
  if (e.target === e.currentTarget) closePopup(popup);
};

const handleEscKeydown = function (e) {
  if (e.key !== "Escape") return;
  const currentPopup = document.querySelector(".popup_opened");

  closePopup(currentPopup);
};

const showCardPreview = function (name, link) {
  previewCaption.textContent = name;
  previewImage.alt = name;
  previewImage.src = link;

  openPopup(previewPopup);
};

const editProfile = function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  profileFromValidator.resetValidator();
  openPopup(profilePopup);
};

const saveProfile = function (e) {
  e.preventDefault();
  closePopup(profilePopup);

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
};

const registerPopupEventsListeners = function () {
  previewCloseBtn.addEventListener("click", () => closePopup(previewPopup));
  profileEditBtn.addEventListener("click", editProfile);
  profileCloseBtn.addEventListener("click", () => closePopup(profilePopup));
  profileForm.addEventListener("submit", saveProfile);
  cardAddBtn.addEventListener("click", () => openPopup(cardPopup));
  cardCloseBtn.addEventListener("click", () => closePopup(cardPopup));
  cardForm.addEventListener("submit", addCard);
  popupList.forEach((popup) =>
    popup.addEventListener("click", (e) => handlePopupOverlayClick(e, popup))
  );
};

const init = function () {
  renderCards(initialCards);
  registerPopupEventsListeners();
  profileFromValidator.enableValidation();
  cardFromValidator.enableValidation();
};
init();
