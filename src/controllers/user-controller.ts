import { Document, Error, MongooseError } from "mongoose";
import { IUser, User } from "../models/user";
import { BaseController } from "./base-controller";

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  async login(email: string, password: string): Promise<Document | string> {
    const login = await User.login(email, password);
    return login;
  }

  logout() {}

  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<Document | string> {
    const exists = await User.emailExists(email);
    if (!exists) {
      const user = new User({
        email,
        password,
        name,
      });

      const saved = await user.save();
      return saved;
    }
    return this.handleError("Email already in use.");
  }

  recoverPassword() {}
}
