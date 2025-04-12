import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  config,
  initialCards
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";


const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileEditInputTitle = document.getElementById("modal__input_edit_title");
const profileEditInputDescription = document.getElementById("modal__input_edit_description");

const profileEditForm = document.querySelector("#profile-edit-modal .modal__form");
const modalAddForm = document.getElementById("modal__form_add");
const modalAddTitleInput = document.getElementById("modal__input_add_title");
const modalAddUrlInput = document.getElementById("modal__input_add_url");

const cardSelector = '#card-template';
const modals = document.querySelectorAll(".modal");



const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});


function createCard(data) {
  const newCard = new Card(data, cardSelector, openPictureModal);
  return newCard.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

let cardSection;

// const cardSection = new Section({
//   items: initalCards,
//   renderer: renderCard
// }, '.cards__list');
// cardSection.renderItems();



const popupImage = new PopupWithImage('#image-modal');
popupImage.setEventListeners();

function openPictureModal(name, link) {
  popupImage.open(name, link);
}

const addCardPopup = new PopupWithForm('#modal__add', (formData, form) => {
  //fetch to add a card to the server
  //if the fecth is successfule then add the card to the dom
  
  renderCard({
    name: formData.title,
    link: formData.url
  });
  api.addCard(data.name,data.link)
  form.reset()
});
addCardPopup.setEventListeners();

const editPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
  //fetch to update the userinfo on the server
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description
  });
});
editPopup.setEventListeners();



const profileFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, modalAddForm);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();



profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.toggleBtnState();
});

profileEditButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileEditInputTitle.value = user.name;
  profileEditInputDescription.value = user.job;
  editPopup.open();
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3718ae8e-d35b-4bf4-8217-cdb44d52e250",
    "Content-Type": "application/json"
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData,cards]) => {
    cardSection = new Section({
      items: cards,
      renderer: renderCard
    }, '.cards__list');
    
    userInfo.setUserInfo(userData);      // your function to show name, about, avatar
    cardSection.renderItems();       // your function to create card elements
  })
  .catch(err => console.error(err));

  
