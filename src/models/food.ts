import mongoose, { Schema } from "mongoose";
import connection from "../db";

export const foodSchema = new Schema({
    food_name: {
        type: String,
        required: true,
        unique: true
    },
    serving_qty: {
        type: Number,
        required: true,
        unique: false
    },
    serving_unit: {
        type: String,
        required: true,
        unique: false
    },
    serving_weight_grams: {
        type: Number
    },
    calories: {
        type: Number,
        required: true,
        unique: false
    },
    total_fat: {
        type: Number,
        required: true,
        unique: false
    },
    saturated_fat: {
        type: Number,
        required: true,
        unique: false
    },
    cholesterol: {
        type: Number,
        required: true,
        unique: false
    },
    sodium: {
        type: Number,
        required: true,
        unique: false
    },
    total_carbohydrate: {
        type: Number,
        required: true
    },
    dietary_fiber: {
        type: Number,
        required: true
    },
    sugars: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    }
},{
    id: true,
    toJSON: { getters: true, virtuals: true},
    toObject: { getters: true, virtuals: true},
})

const FoodModel = connection.model('Food', foodSchema);

export default FoodModel;