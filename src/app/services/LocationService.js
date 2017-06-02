import ko from "knockout";
import Location from "../models/Location";
import DataError from "../../core/DataError";
import DataService from "../../core/DataService";

class LocationService extends DataService {

  constructor() {
    super();
    this.locations = ko.observableArray();
    this.loadFromLocalStorage();
  }

  nextId() {
    if (this.locations().length) {
      let ids = this.locations().map(l => l.id());
      return Math.max(...ids);
    }

    return 1;
  }

  loadItem(locationData) {
    if (this.validateLocationData(locationData)) {
      try {
        this.locations.push(new Location(locationData));
      } catch (e) {
        throw new DataError(`Couldn't load Location: ${e.message}`, locationData);
      }
    }
  }

  loadFromLocalStorage() {
    let locationsData = JSON.parse(window.localStorage.getItem('locations'));
    if (locationsData) {
      this.loadData(locationsData);
    }
  }

  saveToLocalStorage() {
    let locationsData = this.locations().map(l => l.toStorable());
    window.localStorage.setItem('locations', JSON.stringify(locationsData));
  }

  validateLocationData(locationData) {
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

    if (locationData.position && (!('lat' in locationData.position) || !('lng' in locationData.position) || typeof locationData.position.lat != 'number' || typeof locationData.position.lng != 'number')) {
      this.errors.push(new DataError('Invalid position Location property', locationData));
      hasErrors = true;
    }

    return !hasErrors;
  }

  getByNeighborhoodId(neighborhoodId) {
    return this.locations().filter(l => l.neighborhoodId() === neighborhoodId);
  }

  create(locationData) {
    locationData.id = this.nextId();

    if (this.validateLocationData(locationData)) {
      try {
        let location = new Location(locationData);
        this.locations.push(location);
        this.saveToLocalStorage();
        return location;
      }
      catch (e) {
        throw new DataError(`Couldn't create Location: ${e.message}`, locationData);
      }
    }

    this.logErrors();
  }
}

export default new LocationService();
