class Card {
    constructor(data, cardSelector, openPictureModal) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPictureModal = openPictureModal;
    }

    _setEventListener() {
        // Click event for opening the picture modal
        this._element.querySelector(".card__image").addEventListener("click", () => this._openPictureModal(this));

        // Click event for removing the card
        this._element.querySelector(".card__trash-button").addEventListener("click", () => {
            this._element.remove();
        });

        // Click event for toggling the like button
        const likeButton = this._element.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button-black");
        });
    }

    _getTemplate() {
        const cardTemplate = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
        return cardTemplate;
    }

    getView() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;
        return this._element;
    }
}

export default Card;