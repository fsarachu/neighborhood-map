import ko from 'knockout';
import Model from "../core/Model";
import NeighborhoodService from '../services/NeighborhoodService';

export default class Location extends Model {
  constructor(data) {
    super(data.id);
    this.name = ko.observable(data.name);
    this.position = {
      lat: ko.observable(data.position.lat),
      lng: ko.observable(data.position.lng),
    };
    this.highlighted = ko.observable(false);
    this.neighborhoodId = ko.observable(data.neighborhoodId);
    this.neighborhood = ko.computed(() => NeighborhoodService.get(this.neighborhoodId()));
    this.marker = ko.observable();
  }

  toStorable() {
    return {
      name: this.name(),
      position: {
        lat: this.position.lat(),
        lng: this.position.lng(),
      },
      highlighted: this.highlighted(),
      neighborhoodId: this.neighborhoodId(),
    };
  }

}
