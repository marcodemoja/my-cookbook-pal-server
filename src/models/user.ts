import { Schema, Model, Document } from "mongoose";
import connection from "../db";
import bcrypt  from 'bcrypt';

export interface IUser {
    email: string,
    password: string,
    name: string
};

interface UserModel extends Model<IUser> {
    login(email: string, password: string): Document<IUser>;
    emailExists(email: string): boolean;
};

const UserSchema = new Schema<IUser, UserModel>({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.static('login', async function (email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw new Error('authentication failed.');
    }
    throw new Error('User not found.');
});

UserSchema.static('emailExists', async function(email) {
    const exists = await this.findOne({email});
    return exists !== null ? true : false;
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


export const User = connection.model<IUser, UserModel>('User', UserSchema);
