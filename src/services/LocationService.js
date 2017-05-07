import ko from "knockout";
import Location from "../models/Location";
import DataError from "../core/DataError";
import DataService from "../core/DataService";

class LocationService extends DataService {

  constructor() {
    super();
    this.locations = ko.observableArray();
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
    this.loadData(locationsData);
  }

  saveToLocalStorage() {
    let locationsData = this.locations().map(location => location.toStorable());
    window.localStorage.setItem('locations', JSON.stringify(locationsData));
  }

  validateLocationData(locationData) {
    let hasErrors = false;

    let requiredProperties = [
      'name',
      'position'
    ];

    for (let property of requiredProperties) {
      if (!locationData[property]) {
        this.errors.push(new DataError(`Missing required property: "${property}"`, locationData));
        hasErrors = true;
      }
    }

    if (locationData.position && (!locationData.position.lat || !locationData.position.lng || typeof locationData.position.lat != 'number' || typeof locationData.position.lng != 'number')) {
      this.errors.push(new DataError('Invalid position property', locationData));
      hasErrors = true;
    }

    return !hasErrors;
  }

}

export default new LocationService();
