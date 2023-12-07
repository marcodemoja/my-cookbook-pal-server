import authRoutes from "./authentication";
import foodRoutes from "./food";
import recipeRoutes from "./recipe";

const routes = {
    "food": foodRoutes,
    "recipe": recipeRoutes,
    "auth": authRoutes
}

export default routes;