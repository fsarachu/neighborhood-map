import ko from 'knockout';
import DataError from '../models/DataError';
import Address from '../models/Address';

class AddressStore {

  constructor() {
    this.addresses = ko.observableArray();
    this.errors = [];
  }

  loadData(addresses) {
    for (let addressData of addresses) {
      let address = this.loadAddress(addressData);
      if (address) {
        this.addresses.push(address);
      }
    }

    if (this.errors.length) {
      for (let error of this.errors) {
        console.error(error.message);
        console.dir(error.data);
      }
      this.errors = [];
    }
  }

  loadAddress(addressData) {
    try {
      if (this.validateAddressData(addressData)) {
        return new Address({
          ...addressData
        });
      }
      return null;
    } catch (e) {
      this.errors.push(new DataError(`Error loading address: ${e.message}`, addressData));
    }
  }

  validateAddressData(addressData) {
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

    if (addressData.position && (!addressData.position.x || !addressData.position.y || typeof addressData.position.x != 'number' || typeof addressData.position.y != 'number')) {
      this.errors.push(new DataError('Invalid position property', addressData));
      hasErrors = true;
    }

    return !hasErrors;
  }

}

export default new AddressStore();
