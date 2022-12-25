import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { validate } from "src/utils/middlewares";
import { v1 as uuidV1 } from "uuid";

const handler = async (req, res) => {
  try {
    const { first, last, email, password } = req.body;
    const name = `${first} ${last}`;
    const uuid = uuidV1();
    const hashed = await bcrypt.hash(password, 10);
    const client = await clientPromise;
    const db = client.db("sweepstakes");
    await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      emailVerified: null,
      image: `https://robohash.org/${uuid}.png`,
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
