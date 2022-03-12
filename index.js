// Elements
const profileName = document.querySelector(".profile__title"),
  profileJob = document.querySelector(".profile__subtitle"),
  editBtn = document.querySelector(".profile__edit-btn"),
  popup = document.querySelector(".popup"),
  popupForm = document.querySelector(".popup__form"),
  nameInput = document.querySelector(".popup__field_value_name"),
  jobInput = document.querySelector(".popup__field_value_job"),
  closeBtn = document.querySelector(".popup__close-btn"),
  saveBtn = document.querySelector(".popup__save-btn");

// Open & close popup
const togglePopup = function () {
  [editBtn, closeBtn].forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target === el) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        popup.classList.toggle("popup_opened");
      }
    })
  );
};

// Save profile
const saveProfile = function () {
  popupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove("popup_opened");
  });
};

// Initialization function
const init = function () {
  togglePopup();
  saveProfile();
};
init();
