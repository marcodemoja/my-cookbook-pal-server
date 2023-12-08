import {} from "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import connection from "./db";
import routes from "./routes";
import { authMiddleware } from "./middlewares/authMiddleware";
const { PORT } = process.env;
const app: Express = express();
const corsOption = {
  allowedHeaders: ['x-auth-token', 'content-type', 'Authorization'],
  exposedHeaders: ['x-auth-token', 'content-type', 'Authorization']
}
connection
  .asPromise()
  .then(() => {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    //middlewares
    app.use([express.json(), express.urlencoded({ extended: false }), cors(corsOption)]);
    //routes
    app.use("/auth", routes.auth);
    app.use("/food", authMiddleware, routes.food);
    app.use("/recipe", authMiddleware, routes.recipe);
    //listen
    app.set("port", PORT);
    app.listen(PORT, () =>
      console.info(`My Cookbook Pal server listening on port ${PORT}`)
    );
  })
  .catch(console.dir);
