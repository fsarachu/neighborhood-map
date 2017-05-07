import ko from 'knockout';
import Model from "../core/Model";

export default class Location extends Model {
  constructor(data) {
    super();
    this.name = ko.observable(data.name);
    this.position = {
      lat: ko.observable(data.position.lat),
      lng: ko.observable(data.position.lng),
    };
    this.marker = ko.observable();
  }

  toStorable() {
    return {
      name: this.name(),
      position: {
        lat: this.position.lat(),
        lng: this.position.lng(),
      },
    };
  }

}
