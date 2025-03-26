import '../pages/index.css';
import FormValidator from "../../components/FormValidator.js";
import Section from "../../components/Section.js";
import Card from "./Card.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../../components/UserInfo.js";
import {
  config
} from "../../utils/constants.js";


const initialCards = [{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
  },
];

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

const addCardPopup = new PopupWithForm('#modal__add', (formData) => {
  renderCard({
    name: formData.title,
    link: formData.url
  });
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