import Router from "ko-component-router";
import redirectToWelcome from "../../router/middleware/redirectToWelcome";
import routes from "../../router/routes";

Router.setConfig({
  base: '',
  hashbang: false,
});

Router.useRoutes(routes);

Router.use(redirectToWelcome);
