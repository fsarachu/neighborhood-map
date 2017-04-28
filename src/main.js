import ko from 'knockout';
import Name from './view-models/Name';

let name = new Name('Franco', 'Sarachu');

ko.applyBindings(name);
