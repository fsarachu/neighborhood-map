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

  validateLocationData(addressData) {
    let hasErrors = false;

    let requiredProperties = [
      'name',
      'position'
    ];

    for (let property of requiredProperties) {
      if (!addressData[property]) {
        this.errors.push(new DataError(`Missing required property: "${property}"`, addressData));
        hasErrors = true;
      }
    }

    if (addressData.position && (!addressData.position.lat || !addressData.position.lng || typeof addressData.position.lat != 'number' || typeof addressData.position.lng != 'number')) {
      this.errors.push(new DataError('Invalid position property', addressData));
      hasErrors = true;
    }

    return !hasErrors;
  }

}

export default new LocationService();
