import { Model, model, models, Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
  },
  { versionKey: false }
);

export default (models.User as Model<User>) || model("User", UserSchema);
