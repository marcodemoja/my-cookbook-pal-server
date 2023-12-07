import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import connection from './db';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded


async function run() {
    await connection.asPromise()
        .then(() => {
            //routes
            app.use(cors())
            app.use("/food", routes.food)
            app.use("/recipe", routes.recipe)
            app.use("/auth", routes.auth)
            app.set("port", port);

            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            app.listen(port, () => {
                console.info(`My Cookbook Pal server listening on port ${port}`)
            });
        });
}

run().catch(console.dir);


