const router = require("koa-router")();
const { register, login } = require("../controller/user");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/users");
// 注册
router.post("/register", async (ctx, next) => {
  // 获取注册信息
  const userInfo = ctx.request.body;
  //  注册
  try {
    const newUser = await register(userInfo);
    console.log("注册成功");
    ctx.body = {
      errno: 0,
      data: newUser,
    };
  } catch (ex) {
    console.error("注册失败", ex);
    ctx.body = {
      errno: -1,
      message: "注册失败",
    };
  }
});
// 登录
router.post("/login", async (ctx, next) => {
  const userInfo = ctx.request.body;
  try {
    const result = await login(userInfo);
    if (result) {
      ctx.session.userInfo = { username: userInfo.username };
      ctx.body = {
        errno: 0,
        data: userInfo.username,
      };
    } else {
      ctx.body = {
        errno: -1,
        message: "登录失败",
      };
    }
  } catch (ex) {
    ctx.body = {
      errno: -1,
      message: "登录失败",
    };
  }
});
// 获取用户信息
router.get("/getUserInfo", loginCheck, async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ctx.session.userInfo,
  };
});

module.exports = router;
