// class Api {
//     constructor(options) {
//       // constructor body
//     }
  
//     getInitialCards() {
//       // ...
//     }
  
//     // other methods for working with the API
//     test() {

//         return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//         headers: {
//           authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
//         }
//       })
//         .then(res => res.json())}
//   }


  export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    updateProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, about })
      }).then(this._checkResponse);
    }
  
    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link })
      }).then(this._checkResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    updateAvatar(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: link })
      }).then(this._checkResponse);
    }
  }
  
  
 