export default class Model {

  constructor(id) {
    this.id = id;
  }

  toStorable() {
    throw 'You must override toStorable() in Model';
  }

}
