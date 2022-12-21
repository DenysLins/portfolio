import { validate } from "src/utils/middlewares";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db("sweepstakes");
    const user = await db.collection("users").findOne({
      email,
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.hashed);
      if (isPasswordValid) {
        res.status(204).send();
      } else {
        res.status(401).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

export default validate(handler);
