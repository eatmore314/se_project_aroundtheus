import '../pages/index.css';
import FormValidator from "../components/scripts/FormValidator.js";
import Section from "../components/scripts/Section.js";
import {
  config,
  initialCards
} from "../utils/constants.js";
import Card from "../components/scripts/Card.js";
import PopupWithImage from "../components/scripts/PopupWithImage.js";
import PopupWithForm from "../components/scripts/PopupWithForm.js";
import UserInfo from "../components/scripts/UserInfo.js";


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

const cardSection = new Section({
  items: initialCards,
  renderer: renderCard
}, '.cards__list');
cardSection.renderItems();



const popupImage = new PopupWithImage('#image-modal');
popupImage.setEventListeners();

function openPictureModal(name, link) {
  popupImage.open(name, link);
}

const addCardPopup = new PopupWithForm('#modal__add', (formData, form) => {
  renderCard({
    name: formData.title,
    link: formData.url
  });
  form.reset()
});
addCardPopup.setEventListeners();

const editPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
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