import express, { Request, Response } from "express";
import { RecipeModel, RecipeSchema } from "../models/recipe";
import { validateRequestMiddleware } from "../middlewares";
import { FilterQuery } from "mongoose";
const recipeRoutes = express.Router();

recipeRoutes.post(
  "/create",
  validateRequestMiddleware("/recipe/create"),
  async (req: Request, res: Response) => {
    try {
      const recipe = new RecipeModel(req.body);
      await recipe.save();
      res.status(201).json(recipe.toJSON());
    } catch (e) {
      res.status(400).send(`Server Error: ${e}`);
    }
  }
);

recipeRoutes.put(
  "/update/:recipeId",
  validateRequestMiddleware("/recipe/update/:recipeId"),
  async (req: Request, res: Response, next) => {
    const { recipeId } = req.params;
    const changes = req.body;

    try {
      if (recipeId) {
        const record = await RecipeModel.findByIdAndUpdate(recipeId, changes);
        res.status(200).send(record?.toJSON());
      }
    } catch (e) {
      res.status(500).send(`Internal Error: ${e}`);
    }
  }
);

recipeRoutes.get(
  "/find/:recipeId",
  validateRequestMiddleware("/recipe/find/:recipeId"),
  async (req: Request, res: Response, next) => {
    try {
      const { recipeId } = req.params;
      if (recipeId) {
        const record = await RecipeModel.findById(recipeId);
        res.status(200).json(record?.toJSON());
      } else {
        next();
      }
    } catch (e) {
      res.status(500).send(`Internal Error: ${e}`);
    }
  }
);

recipeRoutes.get(
  "/search/",
  validateRequestMiddleware("/recipe/search/:searchTerm"),
  async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.query;
      const { offset, limit } = req.query;
      const search_query:FilterQuery<typeof RecipeSchema | {}> = searchTerm ? { name: new RegExp(`${searchTerm}i`) } : {};
      const result = await RecipeModel.find(search_query)
        .skip(parseInt(offset as string) || 0)
        .limit(parseInt(limit as string) || 20);
      res.status(200).json(result);
    } catch (e) {
      res.status(404).send(`Recipe not found ${e}`);
    }
  }
);



export default recipeRoutes;
