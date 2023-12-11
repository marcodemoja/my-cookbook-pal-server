import FoodModel from "../models/food";
import { FOOD_NOT_FOUND } from "../Errors";
import * as NutritionXController from "./nutritionx-controller";

const create = async (food: any) => {
  try {
    const result = await new FoodModel(food).save();
    return result;
  } catch (error) {
    throw error;
  }
};

// const createByName = async (foodName: string) => {
//   try {
//     let result;
//     const stored = await FoodModel.findOne({
//       food_name: foodName,
//     });
//     if (stored !== null) {
//       result = stored;
//     } else {
//       const nutritionXResult = await NutritionXController.getNutrients(
//         foodName
//       );
//       const nutritionXFood: any = nutritionXResult.foods[0];
//       const newFood = {
//         food_name: foodName,
//         serving_qty: nutritionXFood.serving_qty,
//         serving_unit: nutritionXFood.serving_unit,
//         serving_weight_grams: nutritionXFood.serving_weight_grams,
//         calories: nutritionXFood.nf_calories,
//         total_fat: nutritionXFood.nf_total_fat,
//         saturated_fat: nutritionXFood.nf_saturated_fat,
//         cholesterol: nutritionXFood.nf_cholesterol,
//         sodium: nutritionXFood.nf_sodium,
//         total_carbohydrate: nutritionXFood.nf_total_carbohydrate,
//         dietary_fiber: nutritionXFood.nf_dietary_fiber,
//         sugars: nutritionXFood.nf_sugars,
//         protein: nutritionXFood.nf_protein,
//         potassium: nutritionXFood.nf_potassium,
//       };
//       result = await new FoodModel(newFood).save();
//     }
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

const findByName = async (foodName: string) => {
  try {
    let result;
    const stored = await FoodModel.findOne({
      food_name: foodName,
    });
    if (stored !== null) {
      result = stored;
    } else {
      const nutritionXResult = await NutritionXController.getNutrients(
        foodName
      );
      const nutritionXFood: any = nutritionXResult.foods[0];
      const newFood = {
        food_name: foodName,
        serving_qty: nutritionXFood.serving_qty,
        serving_unit: nutritionXFood.serving_unit,
        serving_weight_grams: nutritionXFood.serving_weight_grams,
        calories: nutritionXFood.nf_calories,
        total_fat: nutritionXFood.nf_total_fat,
        saturated_fat: nutritionXFood.nf_saturated_fat,
        cholesterol: nutritionXFood.nf_cholesterol,
        sodium: nutritionXFood.nf_sodium,
        total_carbohydrate: nutritionXFood.nf_total_carbohydrate,
        dietary_fiber: nutritionXFood.nf_dietary_fiber,
        sugars: nutritionXFood.nf_sugars,
        protein: nutritionXFood.nf_protein,
        potassium: nutritionXFood.nf_potassium,
      };
      result = await create(newFood);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (foodId: string, changes: any) => {
  try {
    const result = await FoodModel.findByIdAndUpdate(foodId, {
      changes,
    });
    if (!result) throw FOOD_NOT_FOUND;
    return `Resource food with name ${changes.name} updated.`;
  } catch (error) {
    throw error;
  }
};

export { create, findByName, update };
