/* API parameters */
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-42";
export const apiToken = "a91c3713-a825-4ffb-a62c-37b4109d6cd7";
/* Config */
export const VALIDATION_CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};
/* Elements */
export const gallery = document.querySelector(".elements");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");
export const popupList = Array.from(document.querySelectorAll(".popup"));
// Profile popup
export const profilePopup = document.querySelector(".popup_profile");
export const profileForm = profilePopup.querySelector(".popup__form_profile");
export const profileNameInput = profilePopup.querySelector(
  ".popup__field_value_name"
);
export const profileJobInput = profilePopup.querySelector(
  ".popup__field_value_job"
);
export const profileEditBtn = document.querySelector(".profile__edit-btn");
export const profileSaveBtn = profilePopup.querySelector(".popup__save-btn");
export const profileCloseBtn = profilePopup.querySelector(
  ".popup__close-btn_profile"
);
// Avatar popup
export const avatarPopup = document.querySelector(".popup_avatar");
export const avatarForm = avatarPopup.querySelector(".popup__form_avatar");
export const avatarEditBtn = document.querySelector(".profile__avatar-btn");
export const avatarSaveBtn = avatarPopup.querySelector(".popup__close-btn");

// Card popup
export const cardPopup = document.querySelector(".popup_card");
export const cardForm = cardPopup.querySelector(".popup__form_card");
export const cardNameInput = cardPopup.querySelector(
  ".popup__field_value_card-name"
);
export const cardLinkInput = cardPopup.querySelector(
  ".popup__field_value_card-link"
);
export const cardAddBtn = document.querySelector(".profile__add-btn");
export const cardSaveBtn = cardPopup.querySelector(".popup__save-btn");
export const cardCloseBtn = cardPopup.querySelector(".popup__close-btn_card");
// Card delete popup
export const deleteCardPopup = document.querySelector(".popup_delete-confirm");
export const deteteForm = deleteCardPopup.querySelector(".popup__form_delete");
export const deleteCardBtn = deleteCardPopup.querySelector(".popup__close-btn");
// Image preview popup
export const previewPopup = document.querySelector(".popup_preview");
export const previewImage = previewPopup.querySelector(".popup__img");
export const previewCaption = previewPopup.querySelector(".popup__caption");
export const previewCloseBtn = previewPopup.querySelector(".popup__close-btn");
