import { validate } from '@/utils/middlewares';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { mockCampeonato } from '../temp';

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
              `${process.env.API_FUTEBOL_URL}/campeonatos/${cid}`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.API_FUTEBOL_TOKEN}`,
                },
              }
            );
            const championship = await response.data;
            res.json(championship);
          } catch (e) {
            res.status(500).json(e);
          }
        } else {
          res.json(mockCampeonato);
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
