import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, VALIDATION_CONFIG } from "./data.js";

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
const createCardElement = function (data, cardSelector) {
  return new Card(data, cardSelector, showCardPreview).createCard();
};

const renderCards = function (data) {
  data.map((el) => {
    gallery.append(createCardElement(el, "#card"));
  });
};

const addCard = function (e) {
  e.preventDefault();
  gallery.prepend(
    createCardElement(
      {
        name: cardNameInput.value,
        link: cardLinkInput.value,
      },
      "#card"
    )
  );

  cardForm.reset();
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

const handleOpenProfilePopup = function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  profileFromValidator.resetValidator();
  openPopup(profilePopup);
};

const handleOpenCardAddPopup = function () {
  cardForm.reset();
  cardFromValidator.resetValidator();
  openPopup(cardPopup);
};

const saveProfile = function (e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(profilePopup);
};

const registerPopupEventsListeners = function () {
  previewCloseBtn.addEventListener("click", () => closePopup(previewPopup));
  profileEditBtn.addEventListener("click", handleOpenProfilePopup);
  profileCloseBtn.addEventListener("click", () => closePopup(profilePopup));
  profileForm.addEventListener("submit", saveProfile);
  cardAddBtn.addEventListener("click", handleOpenCardAddPopup);
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
