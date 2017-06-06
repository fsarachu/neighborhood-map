import ko from "knockout";
import Neighborhood from "../models/Neighborhood";
import DataError from "../../base/DataError";
import DataService from "../../base/DataService";

export default class NeighborhoodService extends DataService {

  validateData(neighborhoodData) {
    let hasErrors = false;

    let requiredProperties = [
      'id',
      'name',
      'position'
    ];

    for (let property of requiredProperties) {
      if (!(property in neighborhoodData)) {
        this.errors.push(new DataError(`Missing required Neighborhood property: "${property}"`, neighborhoodData));
        hasErrors = true;
      }
    }

    if (neighborhoodData.position && ( !('lat' in neighborhoodData.position) || !('lng' in neighborhoodData.position) || typeof neighborhoodData.position.lat !== 'number' || typeof neighborhoodData.position.lng !== 'number')) {
      this.errors.push(new DataError('Invalid position Neighborhood property', neighborhoodData));
      hasErrors = true;
    }

    return !hasErrors;
  }

  nextId() {
    let neighborhoods = ko.unwrap(this.fetchAll());
    let ids = neighborhoods.map(n => n.id());

    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  fetchAll() {
    let data = Object
      .keys(window.localStorage)
      .filter(k => k.indexOf('neighborhoods.') === 0)
      .map(k => JSON.parse(window.localStorage.getItem(k)));

    return ko.observableArray(data.map(n => new Neighborhood(n)))
  }

  fetch(id) {
    let data = JSON.parse(window.localStorage.getItem(`neighborhoods.${id}`));
    return data ? new Neighborhood(data) : null;
  }

  save(data) {
    if (!data.id) {
      data.id = this.nextId();
    }

    if (this.validateData(data)) {
      window.localStorage.setItem(`neighborhoods.${data.id}`, JSON.stringify(data));
    }

    this.logErrors();

    return this.fetch(data.id);
  }

  destroy(id) {
    window.localStorage.removeItem(`neighborhoods.${id}`);
  }

}


