import { validate } from '@/utils/middlewares';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { mockCampeonatos } from '../temp';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const MOCKED_DATA = process.env.MOCKED_DATA;
  if (session) {
    const { method } = req;

    switch (method) {
      case 'GET':
        try {
          if (!MOCKED_DATA) {
            const response = await axios.get(
              `${process.env.API_FUTEBOL_URL}/campeonatos`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.API_FUTEBOL_TOKEN}`,
                },
              }
            );
            const championships = await response.data.filter(
              (c) => c.status !== 'finalizado'
            );
            res.json(championships);
          } else {
            res.json(mockCampeonatos.filter((c) => c.status !== 'finalizado'));
          }
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      default:
        res.setHeader('Allow', ['POST']);
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
