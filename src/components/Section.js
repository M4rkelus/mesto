export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
