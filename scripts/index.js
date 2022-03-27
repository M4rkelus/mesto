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

/* Elements */
const page = document.querySelector(".page");
const gallery = document.querySelector(".elements");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
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

/* Functions */
const createCard = function (name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener("click", () => showCardPreview(name, link));
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardLikeBtn.addEventListener("click", toggleLike);

  return cardElement;
};

const renderCards = function (data) {
  data.map((el) => {
    gallery.append(createCard(el.name, el.link));
  });
};

const addCard = function (e) {
  e.preventDefault();
  if (!cardNameInput.value || !cardLinkInput.value) return;
  gallery.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  cardForm.reset();

  closePopup(cardPopup);
};

const deleteCard = function (e) {
  e.target.closest(".card").remove();
};

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

const toggleLike = function (e) {
  e.target.classList.toggle("card__like-btn_active");
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

  openPopup(profilePopup);
};

const saveProfile = function (e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(profilePopup);
};

const registerPopupEventsListeners = function () {
  previewCloseBtn.addEventListener("click", () => closePopup(previewPopup));
  profileEditBtn.addEventListener("click", editProfile);
  profileCloseBtn.addEventListener("click", () => closePopup(profilePopup));
  profileForm.addEventListener("submit", saveProfile);
  cardAddBtn.addEventListener("click", () => openPopup(cardPopup));
  cardCloseBtn.addEventListener("click", () => closePopup(cardPopup));
  cardForm.addEventListener("submit", addCard);
};

const init = function () {
  renderCards(initialCards);
  registerPopupEventsListeners();
};
init();