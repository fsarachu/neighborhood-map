export default class DataService {

  constructor() {
    this.errors = [];
  }

  logErrors() {
    if (this.errors.length) {
      for (let error of this.errors) {
        console.error(error.message, '\n', error.data);
      }

      this.errors = [];
    }
  }

  loadData(data) {
    for (let itemData of data) {
      this.loadItem(itemData);
    }

    this.logErrors();
  }

  nextId() {
    throw 'You must override nextId() in DataService';
  }

  loadItem(itemData) {
    throw 'You must override loadItem() in DataService';
  }

  loadFromLocalStorage() {
    throw 'You must override loadFromLocalStorage() in DataService';
  }

  saveToLocalStorage() {
    throw 'You must override saveToLocalStorage() in DataService';
  }

}
