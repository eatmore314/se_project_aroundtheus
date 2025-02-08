const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
console.log(initialCards);


let modal = document.querySelector(".modal");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close");
/* form javascript variables */
let modalInputTitle = document.getElementById("modal__input_title");
let modalInputDescription = document.getElementById("modal__input_description");
let saveButton = document.querySelector(".modal__button");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", ()=> {
   
  modal.classList.add("modal_opened");
})

closeButton.addEventListener("click", ()=> {
  modal.classList.add("modal__close");
})

saveButton.addEventListener("click", (e)=>{
  e.preventDefault();
  const userTitle = modalInputTitle.value;
  const userDescription = modalInputDescription.value;
  if(userTitle.trim() && userDescription.trim()!== ""){
    profileTitle.textContent = userTitle;
    profileDescription.textContent = userDescription;
    modal.classList.add("modal__close");
  }

  }

)
