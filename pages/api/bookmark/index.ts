import { getSession } from "next-auth/client";
import Bookmark from "../../../models/Bookmark";
import dbConnect from "../../../middlewares/dbConnect";

const handler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("unauthenticated");
    return;
  }

  const userID = session.userId;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const bookmarks = await Bookmark.find({ userID });
        res.status(200).json({ success: true, data: bookmarks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { url, title, description } = req.body;
        const bookmark = await Bookmark.create({
          url,
          title,
          description,
          userID,
        });
        res.status(201).json({ success: true, data: bookmark });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;