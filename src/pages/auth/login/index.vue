<template>
  <div class="login-page">
    <h2>登录</h2>
    <!-- 账号输入框 -->
    <div class="form-group">
      <label for="username">账号</label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="请输入账号"
        required
      />
    </div>

    <!-- 密码输入框 -->
    <div class="form-group">
      <label for="password">密码</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="请输入密码"
        required
      />
    </div>

    <!-- 记住密码勾选框 -->
    <div class="remember-or-register">
      <div class="remember-or-register-check" @click="onCheckboxChange">
        <img class="remember-img" v-if="rememberMe" src="/static/images/checkbox-active.png" alt="记住我" />
        <img class="remember-img" v-if="!rememberMe" src="/static/images/checkbox.png" alt="记住我" />
        记住密码
      </div>
      <label @click="handleRegister">注册</label>
    </div>

    <!-- 登录按钮 -->
    <button @click="handleLogin" class="login-button">登录</button>

  </div>
</template>

<script>
import toast from "../../../utils/toast";
import api from "../../../api";
import storage from "../../../utils/storage";
import launch from "../../../utils/launch";

export default {
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: true
    };
  },
  methods: {
    onCheckboxChange() {
      this.rememberMe = !this.rememberMe;
    },
    async handleLogin() {
      if (this.username && this.password) {
        //登录
        const res = await api.login(this.username, this.password);
        if (res) {
          //是否记住用户
          storage.save("rememberMe", this.rememberMe);
          if (this.rememberMe === true) {
            storage.save("username", this.username);
            storage.save("password", this.password);
          } else {
            storage.remove("username");
            storage.remove("password");
          }
          //跳转到首页
          mpvue.reLaunch({ url: "/pages/index/main" });
        } else {
          toast.toast("登录异常");
        }
      } else {
        toast.toast("请输入账号密码！");
      }
    },
    handleRegister() {
      //跳转到注册页
      launch.reLaunch("/pages/auth/register/main");
    }
  },
  mounted() {
    // 如果选择了记住密码，自动填充账号
    const name = storage.getLocal("username");
    if (name) {
      this.username = name;
    }
    const pwd = storage.getLocal("password");
    if (pwd) {
      this.password = pwd;
    }
    this.rememberMe = storage.getLocal("rememberMe") || false;
  },
  onLoad(options) {
    console.log("注册页获取参数：");
    console.log(options.username);
    const name = options.username;
    if (name) {
      this.username = name;
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  height: 100vh;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.remember-or-register {
  margin-bottom: 15px;
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐，可选 */
  display: flex;
}

.remember-or-register-check {
  align-items: center; /* 垂直居中对齐，可选 */
  display: flex;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.login-button {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 100%; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 16px; /* 文字大小 */
  background-color: #007bff; /* 按钮背景色 */
  color: #ffffff; /* 按钮文字颜色 */
  border: none; /* 去除默认边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.remember-img {
  width: 30px;
  height: 30px;
}

button:hover {
  opacity: 0.9;
}
</style>
