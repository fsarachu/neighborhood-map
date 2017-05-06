// Import external packages
import 'material-design-lite/dist/material';
import ko from 'knockout';

// Import app components
import AppComponent from './components/app/app';
import MapComponent from './components/googleMap/googleMap';

// Register components
ko.components.register('app', {...AppComponent});
ko.components.register('app-google-map', {...MapComponent});

// Apply bindings
ko.applyBindings();
