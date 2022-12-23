import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { validate } from "src/utils/middlewares";

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const client = await clientPromise;
    const db = client.db("sweepstakes");
    await db.collection("users").insertOne({
      email,
      hashed,
    });
    res.status(204).send();
  } catch (e) {
    if (e?.code === 11000) {
      res.status(409).send();
    } else {
      res.status(500).json(e);
    }
  }
};

export default validate(handler);
