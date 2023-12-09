import { Response } from "express";

class StatusError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export const UNEXPECTED_ERROR = new StatusError(500, "Unhandled server error.");
export const FOOD_NOT_FOUND = new StatusError(404, "Food not found.");
export const AUTH_FAILED = new StatusError(401, "Authentication failed.");
export const SIGNUP_FAILED = new StatusError(409, "Email already exists.");

export const handleResponseError = (
  res: Response,
  error: StatusError | any
) => {
  if (error instanceof StatusError) {
    return res.status(error.status).send(error.message);
  } else {
    console.log("Unhandled error", error);
    return res.status(UNEXPECTED_ERROR.status).send(UNEXPECTED_ERROR.message);
  }
};
