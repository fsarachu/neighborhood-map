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

  validateData(data) {
    throw 'You must override validateData() in DataService';
  }

  nextId() {
    throw 'You must override nextId() in DataService';
  }

  fetchAll() {
    throw 'You must override getAll() in DataService';
  }

  fetch(id) {
    throw 'You must override get() in DataService';
  }

  save(data) {
    throw 'You must override save() in DataService';
  }

  destroy(id) {
    throw 'You must override destroy() in DataService';
  }

}
