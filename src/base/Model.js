import ko from 'knockout';

export default class Model {

  constructor(id) {
    this.id = ko.observable(id);
  }

}
