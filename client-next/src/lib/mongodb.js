import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://root:example@localhost:27017'
    : process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(`${MONGODB_URI}/sweepstakesDb?authSource=admin`, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
