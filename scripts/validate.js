const CONFIG = {
  formSelector: ".popup__form",
  cardFormSelector: ".popup__form_card",
  inputSelector: ".popup__field",
  profileEditButtonSelector: ".profile__edit-btn",
  submitButtonSelector: ".popup__save-btn",
  cardFormNameInputClass: "popup__field_value_name",
  cardFormJobInputClass: "popup__field_value_job",
  inactiveButtonClass: "popup__save-btn_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};

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

const setEventListeners = function (
  configObj,
  formElement,
  inputList,
  buttonElement
) {
  const profileEditButton = document.querySelector(
    configObj.profileEditButtonSelector
  );
  inputList.forEach((inputElement) => {
    if (
      inputElement.classList.contains(configObj.cardFormNameInputClass) ||
      inputElement.classList.contains(configObj.cardFormJobInputClass)
    ) {
      profileEditButton.addEventListener("click", () => {
        checkInputValidity(configObj, formElement, inputElement);
        toggleButtonState(configObj, inputList, buttonElement);
      });
    }
    inputElement.addEventListener("input", () => {
      checkInputValidity(configObj, formElement, inputElement);
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
  const cardForm = document.querySelector(configObj.cardFormSelector);
  const cardFormInputList = Array.from(
    cardForm.querySelectorAll(configObj.inputSelector)
  );
  const cardFormButtonElement = cardForm.querySelector(
    configObj.submitButtonSelector
  );

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(configObj.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      configObj.submitButtonSelector
    );
    setEventListeners(configObj, formElement, inputList, buttonElement);
  });
  toggleButtonState(configObj, cardFormInputList, cardFormButtonElement);
};

enableValidation(CONFIG);
