import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageEl = this._popupElement.querySelector(".modal__image");
        this._captionEl = this._popupElement.querySelector(".modal__image-description");
    }

    open(name, link) {
        this._imageEl.src = link;
        this._imageEl.alt = name;
        this._captionEl.textContent = name;
        super.open();
    }
}