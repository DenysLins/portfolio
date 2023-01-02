import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
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
      enum: ['ALLOWED', 'NOT_ALLOWED'],
      default: 'NOT_ALLOWED',
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const SweepstakeSchema = new Schema(
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

const model = mongoose.model('Sweepstake', SweepstakeSchema);

export const schema = model.schema;
export default model;
