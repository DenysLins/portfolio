import { validate } from '@/utils/middlewares';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import {
  mockRodada1,
  mockRodada2,
  mockRodada3,
  mockRodada4,
} from '../../../temp';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const MOCKED_DATA = process.env.MOCKED_DATA;

  if (session) {
    const { method } = req;
    const { cid, rid } = req.query;

    switch (method) {
      case 'GET':
        if (!MOCKED_DATA) {
          try {
            const response = await axios.get(
              `${process.env.API_FUTEBOL_URL}/campeonatos/${cid}/rodadas/${rid}`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.API_FUTEBOL_TOKEN}`,
                },
              }
            );
            const round = await response.data;
            res.json(round);
          } catch (e) {
            res.status(500).json(e);
          }
        } else {
          switch (rid) {
            case '1':
              res.json(mockRodada1);
              break;
            case '2':
              res.json(mockRodada2);
              break;
            case '3':
              res.json(mockRodada3);
              break;
            default:
              res.json(mockRodada4);
              break;
          }
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
