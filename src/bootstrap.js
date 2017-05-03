// Import external packages
import 'material-design-lite/dist/material';
import ko from 'knockout';

// Import app components
import AppComponent from './components/app/app';
import MapComponent from './components/map/map';

// Register components
ko.components.register('app', {...AppComponent});
ko.components.register('app-map', {...MapComponent});

// Apply bindings
ko.applyBindings();
