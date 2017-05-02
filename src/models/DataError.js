export default class DataError {

  constructor(message, data) {
    this._message = message;
    this._data = data;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }
}
