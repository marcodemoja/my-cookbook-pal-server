import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectionURI = process.env.DB_CONN_STR;
const connection = mongoose.createConnection(connectionURI as string);

export default connection;
