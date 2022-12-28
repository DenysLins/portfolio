import { unstable_getServerSession } from "next-auth/next";
import { validate } from "src/utils/middlewares";
import Sweepstake from "../../../models/sweepstakes/Sweepstake";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    console.log;
    const { method } = req;
    const { slug } = req.query;
    const { name, email, image, status } = req.body;

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
                  name: name,
                  email: email,
                  status: "NOT_ALLOWED",
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
      case "GET":
        try {
          const s = await Sweepstake.findById(slug[0]);
          res.json(s);
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      case "PUT":
        try {
          await Sweepstake.findOneAndUpdate(
            { _id: slug[0], "users.email": email },
            {
              $set: { "users.$.status": status },
            }
          );
          const s = await Sweepstake.findById(slug[0]);
          res.status(200).json(s);
        } catch (e) {
          res.status(500).json(e);
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT"]);
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
