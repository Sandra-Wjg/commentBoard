import axios from "axios";
axios.defaults.withCredentials = true;

// 统一处理 res
function resHandler(res = {}) {
  const resData = res.data || {};
  if (resData.errno === 0) {
    return resData.data || {};
  }
  // 统一弹出错误
  if (!resData.hideMessage) {
    alert(resData.message);
  }
  throw Error(`错误码： ${resData.errno} \n错误信息：${resData.message}`);
}

async function ajaxGet(url = "", params = {}) {
  if (!url) return;
  try {
    const res = await axios.get(url, params);
    return resHandler(res);
  } catch (ex) {
    throw Error(ex);
  }
}

async function ajaxPost(url = "", data = {}) {
  if (!url) return;
  try {
    const res = await axios.post(url, data);
    return resHandler(res);
  } catch (ex) {
    throw Error(ex);
  }
}

export { ajaxGet, ajaxPost };
