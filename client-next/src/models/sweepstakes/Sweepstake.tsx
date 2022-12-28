import { Model, model, models, Schema } from "mongoose";

interface User {
  name: string;
  email: string;
  status: string;
  image: string;
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
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ALLOWED", "NOT_ALLOWED"],
      default: "NOT_ALLOWED",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const SweepstakeSchema = new Schema<Sweepstake>(
  {
    name: {
      type: String,
      required: true,
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
