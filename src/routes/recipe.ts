import express, { Request, Response, ErrorRequestHandler } from 'express';
import { RecipeModel } from '../models/recipe';

const recipeRoutes = express.Router();

recipeRoutes.post('/', async (req: Request, res: Response, next) => {
    try {
        const recipe = new RecipeModel(req.body);
        await recipe.save();
        res.status(201)
            .json(recipe.toJSON())
            .end()
    } catch (e) {
        res.status(400)
            .send(`Server Error: ${e}`)
            .end();
    }
});

recipeRoutes.patch('/', async (req:Request, res:Response, next) => {
    const id = req.query.id;
    const changes = req.body;
    
    try {
        if(id) {
            const record = await RecipeModel.findByIdAndUpdate(id, changes)
            res.status(200)
                .send(record?.toJSON())
                .end(); 
        }
    } catch (e) {
        res.status(500)
        .send(`Internal Error: ${e}`)
        .end();
    }
    
});

recipeRoutes.get('/', async (req: Request, res: Response, next) => {    
    try {
        const id = req.query.id;
        if (id) {
            const record = await RecipeModel.findById(id);
            res.status(200)
                .json(record?.toJSON())
                .end()
        } else {
            next();
        } 
    } catch(e) {
        res.status(500)
            .send(`Internal Error: ${e}`)
            .end();
    }
});

recipeRoutes.get('/search', async (req: Request, res: Response, next) => {
    try {
        const search = req.query.name ? new RegExp(`${req.query.name}i`) : new RegExp('[a-zA-Z]');
        const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
        const result = await RecipeModel.find({ name: search }, null, { skip: offset, limit: limit });

        res.status(200)
            .json(result)
            .end();

    } catch (e) {
        res.status(404)
            .send(`Recipe not found ${e}`)
            .end();
    }
})



export default recipeRoutes;