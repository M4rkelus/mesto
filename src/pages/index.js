import Api from "../components/Api.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import FormValidator from "../components/FormValidator.js";
import {
  profileForm,
  profileNameInput,
  profileJobInput,
  profileEditBtn,
  profileSaveBtn,
  avatarForm,
  avatarSaveBtn,
  avatarEditBtn,
  cardForm,
  cardAddBtn,
  cardSaveBtn,
  deleteCardBtn,
  VALIDATION_CONFIG,
  baseUrl,
  apiToken,
} from "../utils/const.js";
import "./index.css";

// Api
const api = new Api({
  baseUrl,
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});

// User info object
const userData = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar-img",
});

// Popup with card image preview
const cardPreviewPopup = new PopupWithImage(".popup_preview");

// Popup with card add form
const cardAddPopup = new PopupWithForm(".popup_card", (item) => {
  api
    .postCard(item)
    .then((card) => {
      cardList.addItem(createCardElement(card, "#card"));
      cardAddPopup.close();
      cardFromValidator.resetValidator();
    })
    .catch((err) => console.error(err))
    .finally(() => (cardSaveBtn.value = "Создать"));
});

// Popup with card delete confirm
const cardDeletePopup = new PopupWithConfirm(
  ".popup_delete-confirm",
  (cardId, deleteMethod) =>
    api
      .deleteCard(cardId)
      .then(() => {
        deleteMethod();
        cardDeletePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => (deleteCardBtn.value = "Да"))
);

// Popup with user profile edit form
const profileEditPopup = new PopupWithForm(".popup_profile", (data) =>
  api
    .editUserData({ name: data.name, about: data.job })
    .then((user) => editUserInfo(user))
    .catch((err) => console.error(err))
    .finally(() => (profileSaveBtn.value = "Сохранить"))
);

// Popup with user avatar edit form
const avatarEditPopup = new PopupWithForm(".popup_avatar", ({ link }) =>
  api
    .editUserAvatar(link)
    .then((user) => {
      userData.setUserAvatar(user.avatar);
      avatarEditPopup.close();
      renderApiData();
    })
    .catch((err) => console.error(err))
    .finally(() => (avatarSaveBtn.value = "Сохранить"))
);

// Form validators
const profileFromValidator = new FormValidator(VALIDATION_CONFIG, profileForm);
const avatarFromValidator = new FormValidator(VALIDATION_CONFIG, avatarForm);
const cardFromValidator = new FormValidator(VALIDATION_CONFIG, cardForm);

/* Functions */
// Rendering user data and cards from the API
let cardList;
const renderApiData = function () {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([user, cardsArr]) => {
      renderUserInfo(user);
      cardList = new Section(
        {
          items: cardsArr,
          renderer: (card) => {
            cardList.addItem(createCardElement(card, "#card"));
          },
        },
        ".elements"
      );
      cardList.renderElements();
    })
    .catch((err) => console.error(`Что-то пошло не так: (${err})`));
};

const renderUserInfo = function (user) {
  userData
    .setUserInfo({ name: user.name, job: user.about })
    .setUserAvatar(user.avatar)
    .setUserId(user._id);
};

const editUserInfo = function (user) {
  userData.setUserInfo({ name: user.name, job: user.about });
  profileEditPopup.close();
};

const createCardElement = function (data, cardSelector) {
  return new Card(
    data,
    cardSelector,
    userData.getUserId(),
    () => cardPreviewPopup.open(data),
    (isLiked, id) => api.likeCard(isLiked, id),
    (cardId, deleteMethod) => cardDeletePopup.open(cardId, deleteMethod)
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
  avatarEditBtn.addEventListener("click", () => avatarEditPopup.open());
  cardAddBtn.addEventListener("click", () => cardAddPopup.open());
};

const init = function () {
  renderApiData();
  registerOpenPopupEventsListeners();
  cardPreviewPopup.setEventListeners();
  cardAddPopup.setEventListeners();
  cardDeletePopup.setEventListeners();
  profileEditPopup.setEventListeners();
  avatarEditPopup.setEventListeners();
  cardFromValidator.enableValidation();
  profileFromValidator.enableValidation();
  avatarFromValidator.enableValidation();
};
init();
