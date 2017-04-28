import ko from 'knockout';

export default function () {
  this.fruits = ko.observableArray([
    {
      id: 1,
      name: 'Apple',
      selected: ko.observable(false)
    },
    {
      id: 2,
      name: 'Orange',
      selected: ko.observable(false)
    },
    {
      id: 3,
      name: 'Banana',
      selected: ko.observable(false)
    },
    {
      id: 4,
      name: 'Peach',
      selected: ko.observable(false)
    },
    {
      id: 5,
      name: 'Lemon',
      selected: ko.observable(false)
    },
  ]);

  this.selectedFruits = ko.pureComputed(() => this.fruits().filter(fruit => fruit.selected()));

  this.selectedAllFruits = ko.pureComputed({
    read() {
      return this.selectedFruits().length === this.fruits().length;
    },
    write(value) {
      for (let fruit of this.fruits()) {
        fruit.selected(value);
      }
    },
    owner: this
  });
}
