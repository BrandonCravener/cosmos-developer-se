import Bookmark from '../../models/bookmark';
import connectDB from '../../middlewares/database';
import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (session) {
        if (req.method === 'POST') {
            const userID = session.userId;
            const { url, title, description, date } = req.body;
            try {
                var bookmark = new Bookmark({
                    url,
                    title,
                    description,
                    date,
                    userID
                });
                var newBookmark = await bookmark.save();
                return res.status(200).send(newBookmark);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(401).send("unauthenticated");
        }
    }
}

export default connectDB(handler);