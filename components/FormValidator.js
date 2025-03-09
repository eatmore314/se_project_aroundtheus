import { config } from './Constance.js';
class FormValidation {
    constructor(config,form) {
        this._config = config;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._form = form;
        this._formSelector = config.formSelector;
       this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }
    _toggleBtnState(){
   
        //is this right? (this._hasInvalidInput(input))
        if(this._hasInvalidInput(this._allInputs)){
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
        }
        
       //check this
        _hasInvalidInput(inputList){
        
            return inputList.some(input => !input.validity.valid);
            //if every item passes, it will return false
        }
        
        
        //----------------------------------------
        _showErrorMsg(input){
           
            const errorMsg = this._form.querySelector(`#${input.id}-error`);
            if(!errorMsg) return;
            input.classList.add(this._inputErrorClass);
            errorMsg.textContent = input.validationMessage;
            errorMsg.classList.add(this._errorClass)
        }
        
        _hideErrorMsg(input){
           
            const errorMsg = this._form.querySelector(`#${input.id}-error`);
            input.classList.remove(this._inputErrorClass);
            errorMsg.textContent = "";
            errorMsg.classList.remove(this._errorClass)
        }
        
        _checkValid(input) {
            if(!input.validity.valid){
              this._showErrorMsg(input)
            } else {
            this._hideErrorMsg(input) }
            
        }
        //----------------------------
        
       _setEventListeners(){
            //Same as this: const inputSelector = obj.inputSelector;
            this._allInputs = [...this._form.querySelectorAll(this._inputSelector)];
            this._submitButton = this._form.querySelector(this._submitButtonSelector);
            this._allModals = this._form.querySelectorAll(".modal");
            this._allInputs.forEach((input)=>{
                input.addEventListener("input",(e)=>{
                  this._checkValid(input)
                  this._toggleBtnState();
                })
            })
         }
        
        enableValidation(){
                this._form.addEventListener("submit", (e)=>{ //e.target = form (element event was fired o)
                    e.preventDefault()
                })
                this._setEventListeners()
        }

    }


    
    export default FormValidation

  