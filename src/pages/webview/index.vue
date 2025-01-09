<template>
  <div>
    <web-view :src="webUrl"></web-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      webUrl: "" // 默认网页地址
    };
  },

  components: {},

  methods: {},

  created() {

  },
  onLoad(options) {
    // 从参数中获取 URL
    if (options.url) {
      this.webUrl = decodeURIComponent(options.url);
    }
  }
};
</script>

<style scoped>
</style>
