<template>
  <div>
    <button @click="login">登录</button>
    <button @click="collect">获取收藏</button>
  </div>
</template>

<script>
import launch from "../../utils/launch";
import storage from "../../utils/storage";
import toast from "../../utils/toast";

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
      const cookie = storage.getLocal("cookie");
      if (cookie) {
        launch.navigateTo("/pages/collect/main");
      } else {
        toast.toast("请先登录");
      }
    }
  },

  created() {

  }
};
</script>

<style scoped>

button {
  margin: 10px;
}
</style>
