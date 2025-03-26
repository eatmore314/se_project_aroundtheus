import FormValidator from "./FormValidator.js"
import {
  config
} from "../../utils/constants.js"
import Card from "./Card.js"
import '../pages/index.css'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from "../scripts/UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});


const initialCards = [{
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

/*Profile Edit Modal */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditInputTitle = document.getElementById("modal__input_edit_title");
const profileEditInputDescription = document.getElementById("modal__input_edit_description");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
/* Add Modal */
const modalAdd = document.querySelector("#modal__add");
const modalAddForm = document.getElementById("modal__form_add");
const modalAddTitleInput = document.getElementById("modal__input_add_title");
const modalAddUrlInput = document.getElementById("modal__input_add_url");
/* template variables */
const cardListEl = document.querySelector(".cards__list");
/*Image Modal */
const modalImage = document.getElementById("image-modal");
const modalImagePopup = modalImage.querySelector(".modal__image");
const modalImageDescription = document.querySelector(".modal__image-description");
const modals = document.querySelectorAll(".modal");
//Card Selector
const cardSelector = '#card-template';


const addPopup = new PopupWithForm(
  '#modal__add',
  () => {}
);

addPopup.setEventListeners();
const editPopup = new PopupWithForm(
  '#profile-edit-modal',
  () => {}
);
editPopup.setEventListeners();



profileAddButton.addEventListener("click", () => {
  addPopup.open();
});

profileEditButton.addEventListener("click", () => {
  // set input values to text content
  profileEditInputTitle.value = profileTitle.textContent;
  profileEditInputDescription.value = profileDescription.textContent;
  editPopup.open();
});


profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userTitle = profileEditInputTitle.value;
  const userDescription = profileEditInputDescription.value;
  if (userTitle.trim() && userDescription.trim() !== "") {
    profileTitle.textContent = userTitle;
    profileDescription.textContent = userDescription;
    //closeModal(profileEditModal);
  }
});

function createCard(data) {
  const newCard = new Card(data, cardSelector, openPictureModal)
  const cardElement = newCard.getView();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data)
  cardListEl.prepend(cardElement);
}




function openPictureModal(name, link) {
  popupImage.open(name, link)
}



function handleModalAddSubmit(evt) {
  evt.preventDefault();
  const name = modalAddTitleInput.value;
  const link = modalAddUrlInput.value;
  renderCard({
    name,
    link
  });
  evt.target.reset();
};



modalAddForm.addEventListener("submit", handleModalAddSubmit)


initialCards.forEach((cardData) => {
  renderCard(cardData);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__close")) {}
  })

})

const profileFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, modalAddForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();


const popupImage = new PopupWithImage('#image-modal');
popupImage.setEventListeners();