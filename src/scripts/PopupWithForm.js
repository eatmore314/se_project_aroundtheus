import Popup from './Popup.js';

class PopupWithForm extends Popup {
   constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popupElement.querySelector(".modal__form");
      this._inputList = this._form.querySelectorAll(".modal__input");
   }

   _getInputValues() {
      const formValues = {};
      this._inputList.forEach(input => {
         formValues[input.name] = input.value;
      });
      return formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", (e) => {
         e.preventDefault();
         const inputData = this._getInputValues();
         this._handleFormSubmit(inputData);
         this.close();
      });
   }

   close() {
      super.close();
      this._form.reset();
   }
}
export default PopupWithForm;