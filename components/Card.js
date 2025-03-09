class Card {
    constructor(data, cardSelector, openPictureModal) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPictureModal = openPictureModal;
    }

    _setEventListener() {

        this._element.querySelector(".card__image").addEventListener("click", this._openPictureModal(this));

        this._element.querySelector(".card__trash-button").addEventListener("click", this._element.remove())
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            this._likeButton.classList.toggle("card__like-button-black");
        })
    }
    _openPictureModal() {

    }
    _getTemplate() {
        const cardTemplate = document.querySelector("#card-template").content.querySelector(".card").cloneNode("true");
        return cardTemplate;
    }

    getView() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
    }
}

export default Card