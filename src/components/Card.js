class Card {
  constructor(
    data,
    cardSelector,
    handleCardImageClick,
    handleDeleteClick,
    handleCardLikeButtonClick
  ) {
    console.log(data);
 
    this.name = data.name;
    this.link = data.link;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLikeButtonClick = handleCardLikeButtonClick;
  }

  _setEventListener() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardImageClick(this.name, this.link)
      );

    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      //likeButton.classList.toggle("card__like-button-black");
      this._handleCardLikeButtonClick(this);
    });
  }

  likeCardOnDom() {
    this._likeButton.classList.add("card__like-button-black");
   
  }

  unlikeCardOnDom() {
    this._likeButton.classList.remove("card__like-button-black");
   
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  remove() {
    this._element.remove();
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListener();
    this._element.querySelector(".card__title").textContent = this.name;
    this._element.querySelector(".card__image").src = this.link;
    this._element.querySelector(".card__image").alt = this.name;
    // check if the card is liked on page load, and if so, we make it look liked
    if (this.isLiked){
        this.likeCardOnDom()
    }
    return this._element;
  }
}

export default Card;
