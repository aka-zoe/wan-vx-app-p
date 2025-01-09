<template>
  <div class="login-page">
    <h2>注册</h2>
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

    <!-- 密码输入框 -->
    <div class="form-group">
      <label for="password">密码确认</label>
      <input
        type="password"
        id="password"
        v-model="repassword"
        placeholder="请再次输入密码"
        required
      />
    </div>

    <!-- 登录按钮 -->
    <button @click="register" class="login-button">注册</button>
    <button @click="cancel" class="login-button">取消</button>

  </div>
</template>

<script>
import toast from "../../../utils/toast";
import api from "../../../api";
import launch from "../../../utils/launch";

export default {
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      repassword: ""
    };
  },
  methods: {
    async register() {
      if (this.username && this.password && this.repassword) {
        if (this.password === this.repassword) {
          const res = await api.register(this.username, this.password, this.repassword);
          if (res) {
            toast.toast("注册成功");
            setTimeout(() => {
              console.log("计时结束！执行代码...");
              // 这里是要执行的逻辑
              launch.reLaunch("/pages/auth/login/main", { username: this.username });
            }, 800);

          } else {
            toast.toast("注册失败");
          }
        } else {
          toast.toast("密码输入不一致");
        }
      } else {
        toast.toast("输入有误");
      }
    },
    cancel() {
      //取消，回到登录页
     launch.reLaunch("/pages/auth/login/main")
    }
  },
  mounted() {
    // EventChannel.on("loginEvent", function(args) {
    //   console.log(`注册页获取Event:${args}`);
    // });
  },
  onLoad(options) {
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
  margin-bottom: 20px;
}

.remember-img {
  width: 30px;
  height: 30px;
}

button:hover {
  opacity: 0.9;
}
</style>
