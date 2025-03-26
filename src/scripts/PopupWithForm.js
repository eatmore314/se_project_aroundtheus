import Popup from './Popup.js';

class PopupWithForm extends Popup {
   constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popupElement.querySelector(".modal__form");
      this._inputList = this._form.querySelectorAll(".modal__input");
   }

   _getInputValues() {
      const inputs = [...this._popupElement.querySelectorAll(".modal__input")];
      const values = {};
      inputs.forEach(input => {
        values[input.name] = input.value;
      });
      return values;
    }
    
    

    setEventListeners() {
      super.setEventListeners();
      this._popupElement.querySelector(".modal__form").addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = this._getInputValues();
        this._handleFormSubmit(formData);
        this.close();
      });
    }
    
    

   close() {
      super.close();
      this._form.reset();
   }
}
export default PopupWithForm;