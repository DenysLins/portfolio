import dbConnect from '@/lib/mongodb';
import User from '@/models/sweepstakes/User';
import { validate } from 'src/utils/middlewares';

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    await dbConnect();
    const user = await User.findOne({
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
