import ko from 'knockout';

export default class Address {

  constructor(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);
    this.marker = ko.observable();
  }

}
