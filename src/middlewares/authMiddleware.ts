import {} from "dotenv/config";
import { Request, Response, NextFunction, Express } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      const decoded = (await jwt.verify(
        token,
        process.env.JWT_SALT as string
      )) as JwtPayload;

      if (decoded) {
        req.auth = {
          _id: decoded._id,
          email: decoded.email,
          name: decoded.name,
        };
        return next();
      }
    }
    throw new Error();
  } catch (error) {
    res.status(401).send("Unauthorized.");
  }
};
