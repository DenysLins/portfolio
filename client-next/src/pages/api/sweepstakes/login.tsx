import dbConnect from "@/lib/mongodb";
import User from "@/models/sweepstakes/User";
import bcrypt from "bcrypt";
import { validate } from "src/utils/middlewares";

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    await dbConnect();
    const user = await User.findOne({
      email,
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.json(user);
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
