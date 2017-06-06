import ko from 'knockout';
import Model from "../../base/Model";
import NeighborhoodService from '../services/NeighborhoodService';

export default class Location extends Model {

  constructor(data) {
    super(data.id);
    this.name = ko.observable(data.name);
    this.highlighted = ko.observable(data.highlighted);
    this.position = {
      lat: ko.observable(data.position.lat),
      lng: ko.observable(data.position.lng),
    };
    this.neighborhoodId = ko.observable(data.neighborhoodId);
    this.neighborhood = ko.computed(() => (new NeighborhoodService).fetch(this.neighborhoodId()));
    this.marker = ko.observable();
  }

}
