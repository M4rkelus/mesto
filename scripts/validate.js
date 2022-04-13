const CONFIG = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-btn",
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

const disableSubmitButton = function (configObj, buttonElement) {
  buttonElement.classList.add(configObj.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activateSubmitButton = function (configObj, buttonElement) {
  buttonElement.classList.remove(configObj.inactiveButtonClass);
  buttonElement.disabled = false;
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
    // Проверка валидации всех полей во всех формах.
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
    disableSubmitButton(configObj, buttonElement);
  } else {
    activateSubmitButton(configObj, buttonElement);
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

export { CONFIG, disableSubmitButton, checkInputValidity, toggleButtonState };
