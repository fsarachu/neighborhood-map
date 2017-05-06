import ko from 'knockout';

export default class Location {

  constructor(data) {
    this.name = ko.observable(data.name);
    this.position = {
      lat: ko.observable(data.position.lat),
      lng: ko.observable(data.position.lng),
    };
    this.marker = ko.observable();
  }

}
