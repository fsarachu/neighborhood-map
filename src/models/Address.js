import ko from 'knockout';

export default class Address {

  constructor(data) {
    this.name = ko.observable(data.name);
    this.position = ko.observable(data.position);
    this.marker = ko.observable();
  }

}
