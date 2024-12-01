import { validate } from '@/utils/middlewares';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import { mockRodadas } from '../../../temp';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const MOCKED_DATA = process.env.MOCKED_DATA;

  if (session) {
    const { method } = req;
    const { cid } = req.query;

    switch (method) {
      case 'GET':
        if (!MOCKED_DATA) {
          try {
            const response = await axios.get(
              `${process.env.API_FUTEBOL_URL}/campeonatos/${cid}/rodadas`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.API_FUTEBOL_TOKEN}`,
                },
              }
            );
            const rounds = await response.data;
            res.json(rounds);
          } catch (e) {
            res.status(500).json(e);
          }
        } else {
          res.json(mockRodadas);
        }
        break;

      default:
        res.setHeader('Allow', ['GET']);
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
