const CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};

const profileNameInput = document.querySelector(".popup__field_value_name");
const profileJobInput = document.querySelector(".popup__field_value_job");
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка "открытия" формы профиля

const showInputError = function (
  configObj,
  formElement,
  inputElement,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configObj.errorClass);
};

const hideInputError = function (configObj, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configObj.inputErrorClass);
  errorElement.classList.remove(configObj.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = function (configObj, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      configObj,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(configObj, formElement, inputElement);
  }
};

const setEventListeners = function (configObj, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(configObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configObj.submitButtonSelector
  );
  // Первоначальная деактиваци submit'а.
  toggleButtonState(configObj, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    /* Проверка и отключение ошибок полей в форме профиля при открытии.
    И повторном открытии если не было submit'а. Для остальных форм такая
    проверка не требуется, так поля в них изначально пустые. */
    profileEditBtn.addEventListener("click", () => {
      if (
        inputElement === profileNameInput ||
        inputElement === profileJobInput
      ) {
        checkInputValidity(configObj, formElement, inputElement);
        toggleButtonState(configObj, inputList, buttonElement);
      }
    });
    // Проверка валидации всех полей во всех формах.
    inputElement.addEventListener("input", () => {
      checkInputValidity(configObj, formElement, inputElement);
      toggleButtonState(configObj, inputList, buttonElement);
    });
    // Отключение кнопки submit'а после добовления новой карточки.
    formElement.addEventListener("submit", () => {
      toggleButtonState(configObj, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = function (configObj, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configObj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(configObj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

const enableValidation = function (configObj) {
  const formList = Array.from(
    document.querySelectorAll(configObj.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(configObj, formElement);
  });
};

enableValidation(CONFIG);
