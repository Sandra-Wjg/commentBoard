// 留言
const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const { create, getList, del, update } = require("../controller/comment");

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

router.post("/del", loginCheck, async (ctx, next) => {
  let { _id } = ctx.request.body;
  const { username } = ctx.session.userInfo;
  try {
    await del(_id, username);
    ctx.body = {
      errno: 0,
    };
  } catch (ex) {
    ctx.body = {
      errno: -1,
      message: "删除失败",
    };
  }
});

router.post("/update", loginCheck, async (ctx, next) => {
  let { _id, content } = ctx.request.body;
  const { username } = ctx.session.userInfo;
  try {
    const newData = await update(_id, username, content);
    ctx.body = {
      errno: 0,
      data: newData,
    };
  } catch (ex) {
    ctx.body = {
      errno: -1,
      message: "更新失败",
    };
  }
});
module.exports = router;
