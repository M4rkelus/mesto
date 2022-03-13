const profileName = document.querySelector(".profile__title"),
  profileJob = document.querySelector(".profile__subtitle"),
  editBtn = document.querySelector(".profile__edit-btn"),
  popup = document.querySelector(".popup"),
  popupForm = document.querySelector(".popup__form"),
  nameInput = document.querySelector(".popup__field_value_name"),
  jobInput = document.querySelector(".popup__field_value_job"),
  closeBtn = document.querySelector(".popup__close-btn");

const openPopup = function () {
  popup.classList.add("popup_opened");
};

const closePopup = function () {
  popup.classList.remove("popup_opened");
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
};

const init = function () {
  registerPopupEventsListeners();
};
init();
