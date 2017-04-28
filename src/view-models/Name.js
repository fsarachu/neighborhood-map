import ko from 'knockout';

export default class Name {
  constructor(firstName = "", lastName = "") {
    this._firstName = ko.observable(firstName);
    this._lastName = ko.observable(lastName);
    this._fullName = ko.computed(() => `${this.firstName} ${this.lastName}`);
  }

  get firstName() {
    return this._firstName();
  }

  set firstName(value) {
    this._firstName(value);
  }

  get lastName() {
    return this._lastName();
  }

  set lastName(value) {
    this._lastName(value);
  }

  get fullName() {
    return this._fullName();
  }

}
