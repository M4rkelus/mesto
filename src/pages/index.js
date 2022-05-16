import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/data.js";
import {
  profileName,
  profileJob,
  profileForm,
  profileNameInput,
  profileJobInput,
  profileEditBtn,
  cardForm,
  cardAddBtn,
  VALIDATION_CONFIG,
} from "../utils/const.js";
import "./index.css";

// User info object
const userData = new UserInfo({ name: profileName, job: profileJob });

// Card list section
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCardElement(item, "#card"));
    },
  },
  ".elements"
);
// Popup with card image preview
const cardPreviewPopup = new PopupWithImage(".popup_preview");

// Popup with card add form
const cardAddPopup = new PopupWithForm(".popup_card", (e, item) => {
  e.preventDefault();
  cardList.addItem(createCardElement(item, "#card"));
  cardAddPopup.close();
  cardFromValidator.resetValidator();
});

// Popup with user profile edit form
const profileEditPopup = new PopupWithForm(".popup_profile", (e, data) => {
  e.preventDefault();
  userData.setUserInfo(data);
  profileEditPopup.close();
});

// Form validators
const profileFromValidator = new FormValidator(VALIDATION_CONFIG, profileForm);
const cardFromValidator = new FormValidator(VALIDATION_CONFIG, cardForm);

// Functions
const createCardElement = function (data, cardSelector) {
  return new Card(data, cardSelector, () =>
    cardPreviewPopup.open(data)
  ).createCard();
};

const handleOpenProfilePopup = function () {
  const user = userData.getUserInfo();
  profileNameInput.value = user.name;
  profileJobInput.value = user.job;
  profileFromValidator.resetValidator();
  profileEditPopup.open();
};

const registerOpenPopupEventsListeners = function () {
  profileEditBtn.addEventListener("click", handleOpenProfilePopup);
  cardAddBtn.addEventListener("click", () => cardAddPopup.open());
};

const init = function () {
  registerOpenPopupEventsListeners();
  cardList.renderElements();
  cardPreviewPopup.setEventListeners();
  cardAddPopup.setEventListeners();
  profileEditPopup.setEventListeners();
  profileFromValidator.enableValidation();
  cardFromValidator.enableValidation();
};
init();
