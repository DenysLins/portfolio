import { Model, model, models, Schema } from "mongoose";

interface User {
  email: string;
  status: string;
}
export interface Sweepstake {
  name: string;
  championship: string;
  championshipId: number;
  logo: string;
  users: User[];
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["ALLOWED", "NOT_ALLOWED"],
      default: "NOT_ALLOWED",
    },
  },
  { versionKey: false }
);

const SweepstakeSchema = new Schema<Sweepstake>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    championship: {
      type: String,
      required: true,
    },
    championshipId: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    users: {
      type: [UserSchema],
      required: false,
      default: [],
    },
  },
  { versionKey: false }
);

export default (models.Sweepstake as Model<Sweepstake>) ||
  model("Sweepstake", SweepstakeSchema);
