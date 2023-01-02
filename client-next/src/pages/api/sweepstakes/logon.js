import dbConnect from '@/lib/mongodb';
import User from '@/models/sweepstakes/User';
import bcrypt from 'bcrypt';
import { validate } from 'src/utils/middlewares';
import { v1 as uuidV1 } from 'uuid';

const handler = async (req, res) => {
  try {
    const { first, last, email, password } = req.body;
    const name = `${first} ${last}`;
    const uuid = uuidV1();
    const hashed = await bcrypt.hash(password, 10);
    await dbConnect();
    const user = {
      name,
      email,
      password: hashed,
      image: `https://robohash.org/${uuid}.png`,
      role: JSON.parse(process.env.ADMIN_EMAILS).includes(email)
        ? 'admin'
        : 'user',
    };
    await User.create(user);
    res.status(201).send();
  } catch (e) {
    console.log(e);
    if (e?.code === 11000) {
      res.status(409).send();
    } else {
      res.status(500).json(e);
    }
  }
};

export default validate(handler);
