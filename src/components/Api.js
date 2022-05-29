export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  getUserData() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  editUserData(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  editUserAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: link }),
    });
  }

  postCard(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify(card),
    }).then(this._getResponse);
  }

  likeCard(isLiked, id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._getResponse);
  }
}
