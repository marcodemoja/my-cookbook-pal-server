import {} from "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { AUTH_FAILED, SIGNUP_FAILED } from "../Errors";

const login = async (email: string, password: string) => {
  try {
    email.trim();
    const result = await User.findOne({ email: email });
    if (!result) throw AUTH_FAILED;
    const auth = await bcrypt.compare(password, result.password);
    if (!auth) throw AUTH_FAILED;
    return result;
  } catch (error) {
    throw error;
  }
};

const signUp = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw SIGNUP_FAILED;
    const result = await new User({
      email: email,
      password: password,
      name: name,
    }).save();
    return result;
  } catch (error) {
    throw error;
  }
};

const tokenize = (payload: any) => {
  try {
    const result = jwt.sign(
      JSON.stringify(payload),
      process.env.JWT_SALT as string
    );
    if (!result) throw AUTH_FAILED;
    return result;
  } catch (error) {
    throw error;
  }
};

const verify = async (token: string) => {
  try {
    const result = jwt.verify(token, process.env.JWT_SALT as string);
    if (!result) throw AUTH_FAILED;
    return result;
  } catch (error) {
    throw error;
  }
};

export { login, signUp, tokenize, verify };
