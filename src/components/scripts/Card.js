class Card {
    constructor(data, cardSelector, handleCardImageClick) {
        this.name = data.name;
        this.link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardImageClick = handleCardImageClick;
    }

    _setEventListener() {
        this._element.querySelector(".card__image").addEventListener("click", () => this._handleCardImageClick(this.name, this.link));

        this._element.querySelector(".card__trash-button").addEventListener("click", () => {
            this._element.remove();
        });

        const likeButton = this._element.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button-black");
        });
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        return cardTemplate;
    }

    getView() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector(".card__title").textContent = this.name;
        this._element.querySelector(".card__image").src = this.link;
        this._element.querySelector(".card__image").alt = this.name;
        return this._element;
    }
}

export default Card;