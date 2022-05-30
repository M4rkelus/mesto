export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.job;
    return this;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
    this._avatar.alt = this._name.textContent;
    return this;
  }

  setUserId(id) {
    this._userId = id;
    return this;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  getUserId() {
    return this._userId;
  }
}
