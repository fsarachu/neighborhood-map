import ko from 'knockout';

export default class Location {

  constructor(data) {
    this.name = ko.observable(data.name);
    this.position = ko.observable(data.position);
    this.marker = ko.observable();
  }

}
