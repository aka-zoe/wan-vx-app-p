<template>
  <div>
    我的
    <button @click="login">登录</button>
    <button @click="collect">获取收藏</button>
  </div>
</template>

<script>
import launch from "../../utils/launch";
import { get } from "../../utils/http";

export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    login() {
      launch.navigateTo("/pages/auth/login/main");
    },
    collect() {

    },
  },

  created() {

  }
};
</script>

<style scoped>
</style>
