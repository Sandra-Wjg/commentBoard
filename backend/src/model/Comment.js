// Comment model
const mogoose = require("../db/db");

const CommentSchema = mogoose.Schema(
  {
    username: String,
    content: { type: String, required: true },
  },
  { timestamps: true }
);
const Comment = mogoose.model("comment", CommentSchema);

module.exports = Comment;
