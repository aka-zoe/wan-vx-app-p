import Fly from "flyio/dist/npm/wx";
import store from "../storage/index";
import toast from "../toast";
// 创建 Fly 实例
const fly = new Fly();

fly.config.baseURL = "https://www.wanandroid.com/";

// 用于存储 token
// let myToken = "";

// 设置请求拦截器，统一为请求添加 token
fly.interceptors.request.use((request) => {
  // if (myToken) {
  //   request.headers.set("token", myToken);  // 如果存在 token，添加到请求头
  // } else {
  //   delete request.headers["token"];  // 如果没有 token，则移除 token
  // }
  // 从存储中读取 cookie，并添加到请求头中
  const cookie = store.getLocal("cookie");
  // const cookie = wx.getStorageSync("cookie");
  if (cookie) {
    // request.headers['Cookie'] = cookie;  // 使用对象形式设置请求头
    request.headers["Cookie"] = cookie[0];  // 使用对象形式设置请求头
  }
  console.log("请求拦截器:", request.url);
  console.log("          ", request);
  return request;
});

// 添加响应拦截器，处理响应数据
fly.interceptors.response.use(
  (response) => {
    console.log("响应拦截器:", response.request.url);
    console.log("         ", response);
    // 这里可以根据需要处理响应数据
    if (response.status !== 200) {
      return Promise.reject(new Error(`请求失败: ${response.status}`));
    }

    // 登录成功后，将 cookie 存储到本地
    if (response.request.url === "user/login") {
      const cookie = response.headers && response.headers["set-cookie"];
      // console.log("cookie存储到本地", cookie);
      if (cookie) {
        // 存储 cookie，用于后续请求
        store.save("cookie", cookie);
        // wx.setStorageSync("cookie", cookie);
      }
    }

    //后端数据结构{"data":obj,"errorCode":0,"errorMsg":""}
    if (response.data.errorCode === 0) {
      //response.data.data才是实际业务中需要的数据
      return response.data.data;
    }else{
      return null;
    }
  },
  (err) => {
    console.error("响应错误拦截器:", err);
    // 处理错误
    return Promise.reject(err);
  }
);

// 设置 token
// export function setToken(token) {
//   myToken = token;
//   // 将 token 存入缓存（示例使用 localStorage，但可以根据实际需求修改）
//   localStorage.setItem("token", token);
// }

// 获取 token（如果没有则返回空字符串）
// export function getToken() {
//   if (!myToken) {
//     myToken = localStorage.getItem("token");  // 从缓存中读取 token
//   }
//   return myToken;
// }

// 发起 GET 请求
export function get(url, params = {}) {
  toast.loading();
  return fly.get(url, params).then(response => {
    toast.dismiss();
    return response;  // 返回响应数据
  }).catch(err => {
    toast.dismiss();
    handleError(err);  // 错误处理
    throw err;
  });
}

// 发起 POST 请求（支持传递 JSON 和 FormData）
export function post(url, params, isFormData = false) {
  toast.loading();
  // 如果是 FormData，处理为表单格式，Content-Type 会自动处理
  if (isFormData) {
    // for (const key in params) {
    //   if (params.hasOwnProperty(key)) {
    //     formData.append(key, params[key]);
    //   }
    // }
    return fly.post({
      method: "post",
      url: url,
      headers: {
        // "Content-Type": "multipart/form-data"
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: params
    }).then(response => {
      toast.dismiss();
      return response;  // 返回响应数据
    }).catch(err => {
      toast.dismiss();
      handleError(err);  // 错误处理
      throw err;
    });
  } else {
    // 默认情况下，发送 JSON 参数
    return fly.post(url, params, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      toast.dismiss();
      return response;  // 返回响应数据
    }).catch(err => {
      toast.dismiss();
      handleError(err);  // 错误处理
      throw err;
    });
  }
}

// 错误处理函数（示例）
function handleError(err) {
  // 错误信息可以根据接口需求进行处理
  if (err.response) {
    console.error(`请求失败: ${err.response.status}`);
  } else {
    console.error("请求失败:", err.message);
  }
}

