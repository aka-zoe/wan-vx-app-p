<template>
  <div class="login-page">
    <h2 class="title">登录</h2>
    <!-- 账号输入框 -->
    <div class="input-group">
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
    <div class="input-group">
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
    <div class="remember-and-register">
      <div class="remember-check" @click="onCheckboxChange">
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
      rememberMe: false
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
          launch.reLaunch("/pages/index/main");
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
 padding: 20px;
  margin: 20px;
}
.title{
  text-align: center;
  margin-bottom: 40px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.remember-and-register {
  margin-bottom: 15px;
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐，可选 */
  display: flex;
}

.remember-check {
  align-items: center; /* 垂直居中对齐，可选 */
  display: flex;
}

.login-button {
  font-size: 16px; /* 文字大小 */
  background-color: #007bff; /* 按钮背景色 */
  color: #ffffff; /* 按钮文字颜色 */
  border-radius: 5px; /* 圆角 */
}

.remember-img {
  width: 30px;
  height: 30px;
}

</style>
