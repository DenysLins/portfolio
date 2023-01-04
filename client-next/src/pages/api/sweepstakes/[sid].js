import dbConnect from '@/lib/mongodb';
import Sweepstake from '@/models/sweepstakes/Sweepstake';
import { validate } from '@/utils/middlewares';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const { method } = req;
    const { sid } = req.query;

    switch (method) {
      case 'GET':
        try {
          await dbConnect();
          const s = await Sweepstake.findById(sid);
          res.json(s);
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      case 'DELETE':
        try {
          await dbConnect();
          await Sweepstake.findByIdAndDelete(sid);
          res.status(204).send();
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(401).send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};

export default validate(handler);
