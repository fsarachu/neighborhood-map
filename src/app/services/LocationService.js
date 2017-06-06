import ko from "knockout";
import Location from "../models/Location";
import DataError from "../../base/DataError";
import DataService from "../../base/DataService";

class LocationService extends DataService {

  validateData(locationData) {
    let hasErrors = false;

    let requiredProperties = [
      'highlighted',
      'id',
      'name',
      'neighborhoodId',
      'position',
    ];

    for (let property of requiredProperties) {
      if (!(property in locationData)) {
        this.errors.push(new DataError(`Missing required Location property: "${property}"`, locationData));
        hasErrors = true;
      }
    }

    if (locationData.position && (!('lat' in locationData.position) || !('lng' in locationData.position) || typeof locationData.position.lat !== 'number' || typeof locationData.position.lng !== 'number')) {
      this.errors.push(new DataError('Invalid position Location property', locationData));
      hasErrors = true;
    }

    return !hasErrors;
  }

  nextId() {
    let locations = ko.unwrap(this.fetchAll());
    let ids = locations.map(l => l.id());

    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  fetchAll() {
    let data = Object
      .keys(window.localStorage)
      .filter(k => k.indexOf('locations.') === 0)
      .map(k => JSON.parse(window.localStorage.getItem(k)));

    return ko.observableArray(data.map(l => new Location(l)))
  }

  fetch(id) {
    let data = JSON.parse(window.localStorage.getItem(`locations.${id}`));
    return data ? new Location(data) : null;
  }

  save(data) {
    if (!data.id) {
      data.id = this.nextId();
    }

    if (this.validateData(data)) {
      window.localStorage.setItem(`locations.${data.id}`, JSON.stringify(data));
    }

    this.logErrors();

    return this.fetch(data.id);
  }

  destroy(id) {
    window.localStorage.removeItem(`locations.${id}`);
  }

}

export default new LocationService();
