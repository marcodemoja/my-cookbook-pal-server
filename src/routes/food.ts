import express, { Request, Response, NextFunction } from "express";
import * as FoodController from "../controllers/food-controller";
import * as NutritionXController from "../controllers/nutritionx-controller";
import { handleResponseError } from "../Errors";
import { validateRequestMiddleware } from "../middlewares";
const foodRoutes = express.Router();

foodRoutes.get(
  "/find/:foodName",
  validateRequestMiddleware("/:foodName"),
  async (req: Request, res: Response) => {
    try {
      const { foodName } = req.params;
      const result = await FoodController.findByName(foodName);
      return res.status(200).json(result);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

foodRoutes.get(
  "/search/:searchTerm",
  validateRequestMiddleware("/search/:searchTerm"),
  async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.params;
      const result = await NutritionXController.searchFood(searchTerm);
      res.status(200).json(result);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

export default foodRoutes;
