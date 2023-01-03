import dbConnect from '@/lib/mongodb';
import { validate } from '@/utils/middlewares';
import { unstable_getServerSession } from 'next-auth/next';
import Sweepstake from '../../../models/sweepstakes/Sweepstake';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === 'GET') {
      try {
        await dbConnect();
        const sweepstakes = await Sweepstake.find({});
        res.status(200).send(sweepstakes);
      } catch (e) {
        res.status(500).json(e);
      }
    }
    if (req.method === 'POST') {
      try {
        const { name, championship, championshipId, logo } = req.body;
        await dbConnect();
        const c = await Sweepstake.create({
          name,
          championship,
          championshipId,
          logo,
          users: [],
        });
        res.status(201).json(c);
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    }
  } else {
    res.status(401).send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};

export default validate(handler);
