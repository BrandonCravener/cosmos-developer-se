import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import Bookmark from "../../../models/Bookmark";
import dbConnect from "../../../middlewares/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("unauthenticated");
    return;
  }

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const bookmark = await Bookmark.findById(id);
        if (!bookmark) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: bookmark });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedBookmark = await Bookmark.deleteOne({ _id: id });
        if (!deletedBookmark) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
