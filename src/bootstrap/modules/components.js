import ko from "knockout";

import AppComponent from "../../app/components/app";
import GoogleMapComponent from "../../app/components/googleMap";
import NeighborhoodMapComponent from "../../app/components/neighborhoodMap/neighborhoodMap";

ko.components.register('app', AppComponent);
ko.components.register('app-google-map', GoogleMapComponent);
ko.components.register('app-neighborhood-map', NeighborhoodMapComponent);
