import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { config, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";
import Popup from "../components/Popup.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.getElementById("avatar_edit_button");

const profileEditInputTitle = document.getElementById("modal__input_edit_title");
const profileEditInputDescription = document.getElementById("modal__input_edit_description");

const profileEditForm = document.querySelector("#profile-edit-modal .modal__form");
const modalAddForm = document.getElementById("modal__form_add");
const modalAddTitleInput = document.getElementById("modal__input_add_title");
const modalAddUrlInput = document.getElementById("modal__input_add_url");
const modalAvatar = document.getElementById("modal__avatar")

const cardSelector = "#card-template";
const modals = document.querySelectorAll(".modal");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

function createCard(data) {
  const newCard = new Card(
    data,
    cardSelector,
    openPictureModal,
    handleDeleteClick,
    handleCardLikeButtonClick
  );
  return newCard.getView();
}

function handleCardLikeButtonClick(card) {
  if (card.isLiked) {
    api.unlikeCard(card.id)
      .then(() => {
        card.unlikeCardOnDom();
        card.isLiked = !card.isLiked;
      })
      .catch((err) => console.error("Error unliking card:", err));
  } else {
    api.likeCard(card.id)
      .then(() => {
        card.likeCardOnDom();
        card.isLiked = !card.isLiked;
      })
      .catch((err) => console.error("Error liking card:", err));
  }
}

let selectedCard;

const newDelete = new PopupWithForm("#delete-modal", () => {
  api.deleteCard(selectedCard.id)
    .then(res => {
      selectedCard.remove();
      newDelete.close();
    })
    .catch((err) => console.error("Error deleting card:", err));
});
newDelete.setEventListeners();

function handleDeleteClick(card) {
  selectedCard = card;
  newDelete.open();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

let cardSection;

const popupImage = new PopupWithImage("#image-modal");
popupImage.setEventListeners();

function openPictureModal(name, link) {
  popupImage.open(name, link);
}

const addCardPopup = new PopupWithForm("#modal__add", (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.url,
  };

  addCardPopup.updateSubmit(true);
  api.addCard(cardData.name, cardData.link)
    .then((newCardData) => {
      renderCard(newCardData);
      modalAddForm.reset();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding new Card", err);
    })
    .finally(() => {
      addCardPopup.updateSubmit(false);
    });
});

addCardPopup.setEventListeners();

const editPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  editPopup.updateSubmit(true);
  api.updateProfile(formData.title, formData.description)
    .then(({ about, name }) => {
      userInfo.setUserInfo({
        name,
        job: about,
      });
      editPopup.close();
    })
    .catch((err) => console.error("Error updating profile:", err))
    .finally(() => editPopup.updateSubmit(false));
});

const avatarPopup = new PopupWithForm("#avatar-edit-modal", (avatarObj) => {
  avatarPopup.updateSubmit(true);
  api.updateAvatar(avatarObj)
    .then(({ avatar }) => {
      userInfo.setUserInfo({ avatar });
      avatarPopup.close();
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => avatarPopup.updateSubmit(false));
});

profileAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

avatarPopup.setEventListeners();
editPopup.setEventListeners();

const profileFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, modalAddForm);
const avatarValidator = new FormValidator(config,  modalAvatar);
avatarValidator.enableValidation();
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
    authorization: "3642387b-caa9-4646-80d3-93024f434a87",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".cards__list"
    );

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems();
  })
  .catch((err) => console.error("Error loading initial data:", err));

