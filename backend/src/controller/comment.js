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

async function del(_id, username) {
  await Comment.deleteOne({
    _id,
    username,
  });
}

async function update(_id, username, content) {
  const newData = await Comment.findOneAndUpdate(
    { _id, username },
    { content },
    { new: true }
  );
  return newData;
}
module.exports = {
  create,
  getList,
  del,
  update,
};
