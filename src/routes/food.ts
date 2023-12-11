import express, { Request, Response, NextFunction } from "express";
import * as FoodController from "../controllers/food-controller";
import * as NutritionXController from "../controllers/nutritionx-controller";
import { handleResponseError } from "../Errors";
import { validateRequestMiddleware } from "../middlewares";
const foodRoutes = express.Router();

// foodRoutes.post(
//   "/create",
//   validateRequestMiddleware("/create"),
//   async (req: Request, res: Response) => {
//     try {
//       const { foodName } = req.body;
//       const result = await FoodController.createByName(foodName);

//       return res.status(200).json(result);
//     } catch (error) {
//       handleResponseError(res, error);
//     }
//   }
// );

foodRoutes.put(
  "/update/:foodId",
  validateRequestMiddleware("/update/:foodId"),
  async (req: Request, res: Response) => {
    try {
      const { foodId } = req.params;
      const changes = req.body;
      const result: string = await FoodController.update(foodId, changes);
      return res.status(200).send(result);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

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

foodRoutes.get(
  "/nutrients/:foodName",
  validateRequestMiddleware("/nutrients/:foodName"),
  async (req: Request, res: Response) => {
    try {
      const { foodName } = req.params;
      const result = await NutritionXController.getNutrients(foodName);
      res.status(200).json(result);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
);

export default foodRoutes;
