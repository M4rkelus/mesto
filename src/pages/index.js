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
  avatarForm,
  avatarEditBtn,
  cardForm,
  cardAddBtn,
  cardSaveBtn,
  deteteForm,
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
  cardAddPopup.renderLoading(true);
  cardFromValidator.updateLoadingView(true);
  api
    .postCard(item)
    .then((card) => {
      cardList.addItem(createCardElement(card, "#card"));
      cardAddPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cardAddPopup.renderLoading(false);
      cardFromValidator.updateLoadingView(false).resetValidator();
      cardSaveBtn.value = "Создать";
    });
});

// Popup with card delete confirm
const cardDeletePopup = new PopupWithConfirm(".popup_delete-confirm");

// Popup with user profile edit form
const profileEditPopup = new PopupWithForm(".popup_profile", (data) => {
  profileEditPopup.renderLoading(true);
  profileFromValidator.updateLoadingView(true);
  api
    .editUserData({ name: data.name, about: data.job })
    .then((user) => editUserInfo(user))
    .catch((err) => console.error(err))
    .finally(() => {
      profileEditPopup.renderLoading(false);
      profileFromValidator.updateLoadingView(false).resetValidator();
    });
});

// Popup with user avatar edit form
const avatarEditPopup = new PopupWithForm(".popup_avatar", ({ link }) => {
  avatarEditPopup.renderLoading(true);
  avatarFromValidator.updateLoadingView(true);
  api
    .editUserAvatar(link)
    .then((user) => {
      userData.setUserAvatar(user.avatar);
      avatarEditPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      avatarEditPopup.renderLoading(false);
      profileFromValidator.updateLoadingView(false).resetValidator();
    });
});

// Form validators
const profileFromValidator = new FormValidator(VALIDATION_CONFIG, profileForm);
const avatarFromValidator = new FormValidator(VALIDATION_CONFIG, avatarForm);
const cardFromValidator = new FormValidator(VALIDATION_CONFIG, cardForm);
const deleteFromValidator = new FormValidator(VALIDATION_CONFIG, deteteForm);

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
  const card = new Card(
    {
      data: { ...data, userId: userData.getUserId() },
      handleCardClick: () => cardPreviewPopup.open(data),
      handleLikeClick: (isLiked, id) =>
        api
          .likeCard(isLiked, id)
          .then((cardData) => card.toggleLike(cardData))
          .catch((err) => console.error(err)),
      handleDeleteClick: (cardId) => {
        cardDeletePopup.open().setSubmit(() => {
          cardDeletePopup.renderLoading(true);
          deleteFromValidator.updateLoadingView(true);
          api
            .deleteCard(cardId)
            .then(() => {
              card.deleteCard();
              cardDeletePopup.close();
            })
            .catch((err) => console.error(err))
            .finally(() => {
              cardDeletePopup.renderLoading(false);
              deleteFromValidator.updateLoadingView(false).resetValidator();
            });
        });
      },
    },
    cardSelector
  );

  return card.createCard();
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
  deleteFromValidator.enableValidation();
};
init();
