import ko from 'knockout';

export default class Address {

  constructor() {
    this.name = ko.observable();
    this.marker = ko.observable();
    this.location = ko.observable();
  }

}
