import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
