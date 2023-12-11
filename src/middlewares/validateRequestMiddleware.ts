import { Request, Response, NextFunction } from "express";
import { handleResponseError } from "../Errors";
import { BAD_REQUEST_ERROR } from "../Errors";
import Joi from "joi";

const ENDPOINT_SCHEMAS: any = {
  "POST /auth/login": (req: Request) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.body),
  "POST /auth/signup": (req: Request) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.body),
  "POST /auth/verify": (req: Request) =>
    Joi.object({
      token: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.body),
  "GET /food/find/:foodName": (req: Request) =>
    Joi.object({
      foodName: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.params),
  "GET /food/search/:searchTerm": (req: Request) =>
    Joi.object({
      searchTerm: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.params),
  "POST /recipe/create": (req: Request) =>
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      preparation: Joi.string().required(),
      ingredients: Joi.array().items({
        food_name: Joi.string().required(),
        serving_unit: Joi.string().required(),
        quantity: Joi.number().required(),
        food_id: Joi.string().required(),
      }),
    })
      .options({ abortEarly: false })
      .validate(req.body),
  "PUT /recipe/update/:recipeId": (req: Request) =>
    Joi.object({
      recipeId: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      preparation: Joi.string().required(),
      ingredients: Joi.array().items({
        food_name: Joi.string().required(),
        serving_unit: Joi.string().required(),
        quantity: Joi.number().required(),
        food_id: Joi.string().required(),
      }),
    })
      .options({ abortEarly: false })
      .validate({ ...req.body, ...req.params }),
  "GET /recipe/find/:recipeId": (req: Request) =>
    Joi.object({
      recipeId: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.params),
  "GET /recipe/search/:searchTerm": (req: Request) =>
    Joi.object({
      searchTerm: Joi.string().required(),
    })
      .options({ abortEarly: false })
      .validate(req.params),
} as const;

export const validateRequestMiddleware = (route: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const KEY: string = `${req.method} ${req.baseUrl + route}`;
      if (!ENDPOINT_SCHEMAS.hasOwnProperty(KEY)) {
        console.warn(
          `******************************************************************************************\nENDPOINT_SCHEMAS["${KEY}"] not implemented.\nValidateRequestMiddleware has been bypassed by default, please implement request schema to avoid problems.\n******************************************************************************************`
        );
        return next();
      }
      const validation: Joi.ValidationResult<any> = ENDPOINT_SCHEMAS[KEY](req);
      if (validation.error) {
        const errorMessage = validation.error.details
          .map((err) => err.message)
          .join(", ");
        throw BAD_REQUEST_ERROR(errorMessage);
      }
      next();
    } catch (error) {
      handleResponseError(res, error);
    }
  };
};
