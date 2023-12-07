import mongoose, { Schema } from "mongoose";
import connection from "../db";

const recipeIngredientSchema = new Schema({
    food_name: {
        type: String,
        unique: true,
    },
    serving_unit: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    food_id: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    preparation: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    ingredients: [recipeIngredientSchema]

},
 {
    id: true,
    toJSON: { getters: true, virtuals: true},
    toObject: { getters: true, virtuals: true}
}, 
);


export const RecipeModel = connection.model('Recipe', RecipeSchema);
