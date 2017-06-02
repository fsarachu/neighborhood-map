import ko from 'knockout';

export default class Model {

  constructor(id) {
    this.id = ko.observable(id);
  }

  toStorable() {
    throw 'You must override toStorable() in Model';
  }

}
