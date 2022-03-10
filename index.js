// Elements
const profileName = document.querySelector(".profile__title"),
  profileAbout = document.querySelector(".profile__subtitle"),
  editBtn = document.querySelector(".profile__edit-btn"),
  popup = document.querySelector(".popup"),
  popupForm = document.querySelector(".popup__container"),
  inputField = popup.querySelectorAll(".popup__field"),
  closeBtn = popup.querySelector(".popup__close-btn"),
  saveBtn = popup.querySelector(".popup__save-btn");

// Open & close popup
const togglePopup = function (btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault(e);
    if (e.target === btn) popup.classList.toggle("popup_opened");
  });
};

// Save profile
const saveProfile = function () {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileName.textContent = inputField[0].value;
    profileAbout.textContent = inputField[1].value;
  });
  togglePopup(saveBtn);
};

// Prevent tansitionon on page load
const preventTransitions = function () {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".preload").classList.remove("preload");
  });
};

// Initialization function
const init = function () {
  inputField[0].value = profileName.textContent;
  inputField[1].value = profileAbout.textContent;

  preventTransitions();
  togglePopup(editBtn);
  togglePopup(closeBtn);
  togglePopup(popup);
  saveProfile();

  popupForm.addEventListener("submit", saveProfile);
};
init();
