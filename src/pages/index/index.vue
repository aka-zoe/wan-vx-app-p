<template>
  <div>
    <button @click="login">登录</button>
    <button @click="collect">获取收藏</button>
    <button @click="homeList">首页文章列表</button>
    <button @click="intoLoginPage">跳转到登录页</button>
  </div>
</template>

<script>
import card from "@/components/card";
import { get, post, setToken } from "../../utils/http";
import { toast, loading, dismiss } from "../../utils/toast";
import api from "@/api/index";

export default {
  data() {
    return {
    };
  },

  components: {
    card
  },

  methods: {
    async login() {
      const res = await api.login("15061442013", "123456");
      console.log(`登录成功：${res.username}`);
    },
    collect() {
      get("message/lg/count_unread/json").then(res => {
      }).catch(err => {
      });
    },
    homeList() {
      api.homeDocList(1).then(res => {
        console.log(`获取首页文章：${res.curPage}`);
      });
    },
    intoLoginPage() {
      mpvue.reLaunch({ url: "/pages/auth/login/main" });
    }
  },

  created() {

  }
};
</script>

<style scoped>
</style>
