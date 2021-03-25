import mongoose from "mongoose";
const { Schema } = mongoose;

const Author = new Schema({
  name: String,
  email: String,
});

const Book = new Schema({
  title: String,
  authors: [Author],
  publishedDate: Date,
  price: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Book", Book);
