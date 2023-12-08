declare namespace Express {
  export interface Request {
    auth?: {
      _id: string;
      email: string;
      name: string;
    };
  }
}
