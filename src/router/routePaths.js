export const BASE_APP_PATH = "/";

const route = (routePath) => `${BASE_APP_PATH}${routePath}`;

export const routePaths = {
  base: route(""),
  order: route("order"),
};
