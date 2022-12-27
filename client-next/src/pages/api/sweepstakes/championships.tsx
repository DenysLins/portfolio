import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";
import { validate } from "src/utils/middlewares";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const response = await axios.get(
        `${process.env.API_FUTEBOL_URL}/campeonatos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_FUTEBOL_TOKEN}`,
          },
        }
      );
      const championships = await response.data;
      res.json(championships);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default validate(handler);