import ko from 'knockout';
import Model from '../core/Model';

export default class Neighborhood extends Model {

  constructor(data) {
    super(data.id);
    this.name = ko.observable(data.name);
    this.position = {
      lat: ko.observable(data.position.lat),
      lng: ko.observable(data.position.lng),
    };
  }

  toStorable() {
    return {
      id: this.id(),
      name: this.name(),
      position: {
        lat: this.position.lat(),
        lng: this.position.lng(),
      },
    };
  }
}
