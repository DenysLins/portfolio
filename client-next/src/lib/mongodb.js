import mongoose from 'mongoose';

let MONGODB_URI = '';
let opts = {};

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI =
    'mongodb://root:example@localhost:27017/sweepstakes?authSource=admin';
  opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };
} else {
  MONGODB_URI = process.env.MONGODB_URI;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${MONGODB_URI}`, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
