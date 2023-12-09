import express, { Request, Response } from "express";
import * as FoodController from "../controllers/food-controller";
import * as NutritionXController from "../controllers/nutritionx-controller";
import { handleResponseError } from "../Errors";

const foodRoutes = express.Router();

foodRoutes.post("/create", async (req: Request, res: Response, next) => {
  try {
    const food = req.body;
    const result = FoodController.create(food);
    return res.status(200).json(result);
  } catch (error) {
    handleResponseError(res, error);
  }
});

foodRoutes.get("/find/:foodName", async (req: Request, res: Response) => {
  try {
    const { foodName } = req.params;
    const result = await FoodController.findByName(foodName);
    return res.status(200).json(result);
  } catch (error) {
    handleResponseError(res, error);
  }
});

foodRoutes.put("/update", async (req: Request, res: Response) => {
  try {
    const food = req.body;
    const result: string = await FoodController.update(food);
    return res.status(200).send(result);
  } catch (error) {
    handleResponseError(res, error);
  }
});

foodRoutes.get("/search/:searchTerm", async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.params;
    const result = await NutritionXController.searchFood(searchTerm);
    res.status(200).json(result);
  } catch (error) {
    handleResponseError(res, error);
  }
});

export default foodRoutes;
