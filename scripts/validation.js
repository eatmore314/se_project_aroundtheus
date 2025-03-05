function toggleBtnState(input,submitBtn,inactiveButtonClass){
   

if(hasInvalidInput(input)){
    console.log("I was called")
     submitBtn.classList.add(inactiveButtonClass);
     submitBtn.disabled = true
} else {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
}
}

function hasInvalidInput(inputList){

return inputList.some((input) => !input.validity.valid);
//if every item passes, it will return false
}


function showErrorMsg(forms,input,{inputErrorClass, errorClass}){
   
    const errorMsg = forms.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorMsg.textContent = input.validationMessage;
    errorMsg.classList.add(errorClass)
}

function hideErrorMsg(forms,input,{inputErrorClass, errorClass}){
   
    const errorMsg = forms.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorMsg.textContent = "";
    errorMsg.classList.remove(errorClass)
}

function checkValid(forms,input,obj) {
    if(!input.validity.valid){
      showErrorMsg(forms,input,obj)
    } else {
    hideErrorMsg(forms,input,obj) }
    
}

function setEventListeners(forms,obj){
    const {inputSelector, submitButtonSelector, inactiveButtonClass} = obj; //sets "inputSelector" as the property of obj (obj.inputSelector)
    //Same as this: const inputSelector = obj.inputSelector;
    const allInputs = [...forms.querySelectorAll(inputSelector)];
    const submitButton = forms.querySelector(submitButtonSelector);
    const allModals = forms.querySelectorAll(".modal")
    console.log(forms)
    allInputs.forEach((input)=>{
        input.addEventListener("input",(e)=>{
          checkValid(forms,input,obj)
          toggleBtnState(allInputs,submitButton,inactiveButtonClass);
        })
    })
 }

function enableValidation(obj){
    const allForms = [...document.querySelectorAll(obj.formSelector)]; //made an array so you can use the forEach loop on it
    allForms.forEach((form)=>{
        form.addEventListener("submit", (e)=>{ //e.target = form (element event was fired o)
            e.preventDefault()
        })
        setEventListeners(form,obj)
    })
}



const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

enableValidation(config)