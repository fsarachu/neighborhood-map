// Import external packages
import 'material-design-lite/dist/material';
import ko from 'knockout';

// Import components
import AppComponent from './components/app/app';
import GoogleMapComponent from './components/googleMap/googleMap';

// Register components
ko.components.register('app', {...AppComponent});
ko.components.register('app-google-map', {...GoogleMapComponent});

// Apply bindings
ko.applyBindings();
