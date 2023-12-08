import express, { Request, Response } from "express";
import FoodModel from "../models/food";

const foodRoutes = express.Router();

foodRoutes.post("/", async (req: Request, res: Response, next) => {
  try {
    const foodExists = await FoodModel.exists({
      food_name: req.body.food_name,
    });
    let resStatus: number;
    let resText: String;

    if (foodExists === null) {
      const food = new FoodModel(req.body);
      await food.save();
      resStatus = 201;
      resText = food.toJSON();
    } else {
      const food = await FoodModel.findById(foodExists._id);
      resStatus = 200;
      resText = food?.toJSON() || "";
    }
    res.status(resStatus).json(resText).end();
  } catch (e) {
    res.status(400).send(`Invalid Request ${e}`).end();
  }
});

foodRoutes.get("/findOne", async (req: Request, res: Response) => {
  try {
    const food = await FoodModel.findOne({ food_name: req.query.food_name });
    if (food === null) {
      res.status(404).end();
    } else {
      res.status(200).json(food.toJSON()).end();
    }
  } catch (e) {
    res.status(500).send(`Bad request ${e}`).end();
  }
});

foodRoutes.put("/", async (req: Request, res: Response) => {
  try {
    const op = await FoodModel.updateOne(
      { name: req.body.name },
      { ...req.body }
    );

    if (op.acknowledged && op.modifiedCount == 1) {
      res
        .status(200)
        .send(
          `${op.modifiedCount} Resource food with name ${req.body.name} updated`
        )
        .end();
    } else {
      res
        .status(404)
        .send(`No resource food found with name ${req.body.name}`)
        .end();
    }
  } catch (e) {
    res
      .status(400)
      .send(`Bad request - Resource not updated. Req: ${req.body.json()}`)
      .end();
  }
});

foodRoutes.get("/search", async (req: Request, res: Response) => {
  try {
    const search = req.query.name
      ? new RegExp(`${req.query.name}`)
      : new RegExp("[a-zA-Z]");
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const result = await FoodModel.aggregate([
      { $match: { $and: [{ name: { $regex: search } }] } },
      { $skip: offset },
      { $limit: limit },
    ]);

    res.status(200).json(result).end();
  } catch (e) {
    res.status(404).send(`Food not found ${e}`).end();
  }
});

export default foodRoutes;
