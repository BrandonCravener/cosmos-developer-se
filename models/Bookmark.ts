import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Bookmark URL Required'],
  },
  title: {
    type: String,
    required: [true, 'Bookmark Title Required'],
  },
  description: {
    type: String,
    required: [true, 'Bookmark Description Required'],
  },
  userID: {
    type: String,
    required: [true, 'Bookmark User ID Required'],
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
