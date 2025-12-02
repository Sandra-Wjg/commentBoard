// 留言
const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const { create, getList } = require("../controller/comment");

router.prefix("/comment");
router.post("/create", loginCheck, async (ctx, next) => {
  const { content } = ctx.request.body;
  const { username } = ctx.session.userInfo;
  const newComment = await create(content, username);
  ctx.body = {
    errno: 0,
    data: newComment,
  };
});
router.get("/list", loginCheck, async (ctx, next) => {
  let { filterType } = ctx.request.query;
  filterType = parseInt(filterType) || 1;
  let username = "";
  if (filterType === 2) {
    username = ctx.session.userInfo.username;
  }
  const list = await getList(username);
  ctx.body = {
    errno: 0,
    data: list,
  };
});
module.exports = router;
