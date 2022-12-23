import clientPromise from "@/lib/mongodb";
import { validate } from "src/utils/middlewares";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const client = await clientPromise;
    const db = client.db("sweepstakes");
    const user = await db.collection("users").findOne({
      email,
    });
    if (user) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

export default validate(handler);
