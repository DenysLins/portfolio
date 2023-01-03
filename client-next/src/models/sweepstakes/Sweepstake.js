import mongoose, { Schema } from 'mongoose';

const UserInSweepstakeSchema = new Schema(
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
      type: [UserInSweepstakeSchema],
      required: false,
      default: [],
    },
  },
  { versionKey: false }
);

export default mongoose.models.Sweepstake ||
  mongoose.model('Sweepstake', SweepstakeSchema);
