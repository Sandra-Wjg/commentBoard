const Comment = require("../model/comment");

async function create(content, username) {
  const newComment = await Comment.create({ content, username });
  return newComment;
}
async function getList(username = "") {
  const whereOpt = {};
  if (username) {
    whereOpt.username = username;
  }
  const list = await Comment.find(whereOpt).sort({ _id: -1 });
  return list;
}
module.exports = {
  create,
  getList,
};
