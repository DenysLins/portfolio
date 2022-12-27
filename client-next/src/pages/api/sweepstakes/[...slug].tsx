import { unstable_getServerSession } from "next-auth/next";
import { validate } from "src/utils/middlewares";
import Sweepstake from "../../../models/sweepstakes/Sweepstake";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const { method } = req;
    const { slug } = req.query;
    const { email } = req.body;

    switch (method) {
      case "POST":
        try {
          const s = await Sweepstake.findById(slug[0]);
          if (s.users.find((s) => s.email === email)) {
            res.status(409).send();
          } else {
            await Sweepstake.findByIdAndUpdate(slug[0], {
              $push: {
                users: {
                  email: email,
                  status: "NOT_ALLOWED",
                },
              },
            });
            res.status(201).send();
          }
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default validate(handler);
