import dbConnect from '@/lib/mongodb';
import Sweepstake from '@/models/sweepstakes/Sweepstake';
import { unstable_getServerSession } from 'next-auth/next';
import { validate } from 'src/utils/middlewares';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const { method } = req;
    switch (method) {
      case 'GET':
        try {
          const { id } = req.query;
          await dbConnect();
          const s = await Sweepstake.findById(id);
          res.json(s);
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      case 'DELETE':
        try {
          const { id } = req.query;
          await dbConnect();
          await Sweepstake.findByIdAndDelete(id);
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
