import Sweepstake from '@/models/sweepstakes/Sweepstake';
import { validate } from '@/utils/middlewares';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { method } = req;
    const { sid } = req.query;
    const { name, email, status, image } = req.body;

    switch (method) {
      case 'POST':
        try {
          const s = await Sweepstake.findById(sid);
          if (s.users.find((s) => s.email === email)) {
            res.status(409).send();
          } else {
            await Sweepstake.findByIdAndUpdate(sid, {
              $push: {
                users: {
                  name: name,
                  email: email,
                  status: 'NOT_ALLOWED',
                  image: image,
                },
              },
            });
            res.status(201).send();
          }
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      case 'PUT':
        try {
          await Sweepstake.findOneAndUpdate(
            { _id: sid, 'users.email': email },
            {
              $set: { 'users.$.status': status },
            }
          );
          const s = await Sweepstake.findById(sid);
          res.status(200).json(s);
        } catch (e) {
          res.status(500).json(e);
        }
        break;

      default:
        res.setHeader('Allow', ['POST', 'PUT']);
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
