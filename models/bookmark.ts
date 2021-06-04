import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var bookmark = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});


const Bookmark = mongoose.model('Bookmark', bookmark);

export default Bookmark;