import FoodModel from "../models/food";
import { FOOD_NOT_FOUND } from "../Errors";

const create = async (food: any) => {
  try {
    let result;
    const storedFood = await FoodModel.findOne({
      food_name: food.food_name,
    });
    if (storedFood !== null) {
      result = storedFood;
    } else {
      const newFood = new FoodModel(food);
      await newFood.save();
      result = newFood;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const findByName = async (foodName: string) => {
  try {
    const storedFood = await FoodModel.findOne({ food_name: foodName });
    if (!storedFood) {
      throw FOOD_NOT_FOUND;
    }
    return storedFood;
  } catch (error) {
    throw error;
  }
};

const update = async (food: any) => {
  try {
    const op = await FoodModel.updateOne({ food_name: food.name }, { ...food });
    if (op.acknowledged && op.modifiedCount == 1) {
      return `${op.modifiedCount} Resource food with name ${food.name} updated`;
    }
    throw FOOD_NOT_FOUND;
  } catch (error) {
    throw error;
  }
};

export { create, findByName, update };
