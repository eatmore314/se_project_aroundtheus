import {
    config
} from '../../utils/constants.js';
class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }
    toggleBtnState() {

        if (this._hasInvalidInput(this._allInputs)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {

        return inputList.some(input => !input.validity.valid);
    }



    _showErrorMsg(input) {

        const errorMsg = this._form.querySelector(`#${input.id}-error`);
        if (!errorMsg) return;
        input.classList.add(this._inputErrorClass);
        errorMsg.textContent = input.validationMessage;
        errorMsg.classList.add(this._errorClass)
    }

    _hideErrorMsg(input) {

        const errorMsg = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorMsg.textContent = "";
        errorMsg.classList.remove(this._errorClass)
    }

    _checkValid(input) {
        if (!input.validity.valid) {
            this._showErrorMsg(input)
        } else {
            this._hideErrorMsg(input)
        }

    }

    _setEventListeners() {
        this._allInputs = [...this._form.querySelectorAll(this._inputSelector)];
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._allInputs.forEach((input) => {
            input.addEventListener("input", (e) => {
                this._checkValid(input)
                this.toggleBtnState();
            })
        })
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault()
        })
        this._setEventListeners()
    }

}



export default FormValidator