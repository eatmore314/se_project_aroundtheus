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

const profileEditModal = document.querySelector("#profile-edit-modal");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close");
const closeButtonAdd = document.querySelector(".modal__add_close");
/* form javascript variables */
const modalInputTitle = document.getElementById("modal__input_title");
const modalInputDescription = document.getElementById(
  "modal__input_description"
);
const saveButton = document.querySelector(".modal__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
/* template variables */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const form = document.querySelector(".modal__form");
const profileAddButton = document.querySelector(".profile__add-button");
const modalAdd = document.querySelector("#modal_add");
const addCardForm = document.getElementById("add_form");
const cardTitleInput = document.getElementById("modal__input_add_title");
const cardUrlInput = document.getElementById("modal__input_url")


function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModalAdd() {
  cardTitleInput.value = profileTitle.textContent;
  cardUrlInput.value = profileDescription.textContent;
  modalAdd.classList.add("modal_opened");
}

profileAddButton.addEventListener("click", ()=>{
  openModal(modalAdd)
});

editButton.addEventListener("click",()=>{
  // set input values to text content
  modalInputTitle.value = profileTitle.textContent;
  modalInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal)
});

closeButton.addEventListener("click", closeModal);

closeButtonAdd.addEventListener("click", ()=>{
  modalAdd.classList.remove("modal_opened");
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userTitle = modalInputTitle.value;
  const userDescription = modalInputDescription.value;
  if (userTitle.trim() && userDescription.trim() !== "") {
    profileTitle.textContent = userTitle;
    profileDescription.textContent = userDescription;
    closeModal(profileEditModal);
  }
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = cardData.link;

  cardImageEl.alt = cardData.name;

  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData){
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleProfileAddSubmit(evt){
evt.preventDefault();
const name = cardTitleInput.value;
const link = cardUrlInput.value;
renderCard({name,link})
closeModal(modalAdd)
};


addCardForm.addEventListener("submit", handleProfileAddSubmit)

initialCards.forEach((cardData) => {
 renderCard(cardData);
});

//initialCards.forEach((cardData) => renderCard(cardData));

