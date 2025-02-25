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
const profileEditCloseButton = document.querySelector(".modal__close");
const profileEditInputTitle = document.getElementById("modal__input_title");
const profileEditInputDescription = document.getElementById("modal__input_description");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
/* Add Modal */
const modalAdd = document.querySelector("#modal__add");
const modalAddForm = document.getElementById("modal__form_add");
const modalAddCloseButton = modalAdd.querySelector(".modal__close");
const modalAddTitleInput = document.getElementById("modal__form_input_add_title");
const modalAddUrlInput = document.getElementById("modal__form_input_url");
/* template variables */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
/*Image Modal */
const modalImage = document.getElementById("image-modal");
const modalImagePopup = modalImage.querySelector(".modal__image");
const modalImageDescription = document.querySelector(".modal__image_description");
const modalImageCloseButton = modalImage.querySelector('.modal__close');

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}




profileAddButton.addEventListener("click", () => {
 openModal(modalAdd)
});

profileEditButton.addEventListener("click", () => {
  // set input values to text content
  profileEditInputTitle.value = profileTitle.textContent;
  profileEditInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal)
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal)
});

modalAddCloseButton.addEventListener("click", () => {
  closeModal(modalAdd);
});


modalImageCloseButton.addEventListener("click", () => {
  closeModal(modalImage);
})


profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userTitle = profileEditInputTitle.value;
  const userDescription = profileEditInputDescription.value;
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
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");
  cardImageEl.addEventListener("click", ()=>openPictureModal(cardData));

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  })
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-black");
  })

  cardImageEl.src = cardData.link;

  cardImageEl.alt = cardData.name;

  cardTitleEl.textContent = cardData.name;

  return cardElement;
}


function openPictureModal(cardData) {
  modalImagePopup.src = cardData.link;
  modalImagePopup.alt = cardData.name;
  modalImageDescription.textContent = cardData.name;

  openModal(modalImage)
}




function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}


function handleModalAddSubmit(evt) {
  evt.preventDefault();
  const name = modalAddTitleInput.value;
  const link = modalAddUrlInput.value;
  renderCard({
    name,
    link
  });
  closeModal(modalAdd);
  evt.target.reset();
};


modalAddForm.addEventListener("submit", handleModalAddSubmit)

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

