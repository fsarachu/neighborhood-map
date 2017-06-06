import ko from "knockout";
import NeighborhoodService from "../../app/services/NeighborhoodService";

export default function (ctx) {
  let neighborhoodService = new NeighborhoodService();
  let neighborhoods = ko.unwrap(neighborhoodService.fetchAll());
  let hasNeighborhood = neighborhoods.length > 0;
  let isWelcomePage = ctx.path === '/welcome';

  if (!isWelcomePage && !hasNeighborhood) {
    ctx.redirect('//welcome');
  }
  else if (isWelcomePage && hasNeighborhood) {
    ctx.redirect('//');
  }

}
