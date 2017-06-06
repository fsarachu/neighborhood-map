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

}

export default new LocationService();
