import { Model, model, models, Schema } from "mongoose";

export interface Sweepstake {
  name: string;
  championship: string;
}

const SweepstakeSchema = new Schema<Sweepstake>({
  name: {
    type: String,
    required: true,
  },
  championship: {
    type: String,
    required: true,
    unique: true,
  },
});

export default (models.Sweepstake as Model<Sweepstake>) ||
  model("Sweepstake", SweepstakeSchema);
