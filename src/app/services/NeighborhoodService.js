import ko from "knockout";
import Neighborhood from "../models/Neighborhood";
import DataError from "../../base/DataError";
import DataService from "../../base/DataService";

class NeighborhoodService extends DataService {

  constructor() {
    super();
    this.neighborhoods = ko.observableArray(); // I know, there's only one neighborhood at the moment, but let's leave the option for multiple neighborhoods open..
    this.loadFromLocalStorage();
  }

  nextId() {
    if (this.neighborhoods().length) {
      let ids = this.neighborhoods().map(n => n.id());
      return Math.max(...ids);
    }

    return 1;
  }

  loadItem(neighborhoodData) {
    if (this.validateNeighborhoodData(neighborhoodData)) {
      try {
        this.neighborhoods.push(new Neighborhood(neighborhoodData));
      } catch (e) {
        throw new DataError(`Couldn't load Neighborhood: ${e.message}`, neighborhoodData);
      }
    }
  }

  loadFromLocalStorage() {
    let neighborhoodsData = JSON.parse(window.localStorage.getItem('neighborhoods'));
    if (neighborhoodsData) {
      this.loadData(neighborhoodsData);
    }
  }

  saveToLocalStorage() {
    let neighborhoodsData = this.neighborhoods().map(n => n.toStorable());
    window.localStorage.setItem('neighborhoods', JSON.stringify(neighborhoodsData));
  }

  validateNeighborhoodData(neighborhoodData) {
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

    if (neighborhoodData.position && ( !('lat' in neighborhoodData.position) || !('lng' in neighborhoodData.position) || typeof neighborhoodData.position.lat != 'number' || typeof neighborhoodData.position.lng != 'number')) {
      this.errors.push(new DataError('Invalid position Neighborhood property', neighborhoodData));
      hasErrors = true;
    }

    return !hasErrors;
  }

  get(id = null) {
    if (!id) {
      return this.neighborhoods()[0];
    }
    return this.neighborhoods().find(n => n.id() === id);
  }

  create(neighborhoodData) {
    neighborhoodData.id = this.nextId();

    if (this.validateNeighborhoodData(neighborhoodData)) {
      try {
        let neighborhood = new Neighborhood(neighborhoodData);
        this.neighborhoods.push(neighborhood);
        this.saveToLocalStorage();
        return neighborhood;
      }
      catch (e) {
        throw new DataError(`Couldn't create Neighborhood: ${e.message}`, neighborhoodData);
      }
    }

    this.logErrors();
  }

}

export default new NeighborhoodService();
