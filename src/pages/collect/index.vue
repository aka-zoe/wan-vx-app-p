<template>
  <div>
    <li v-for="(item,index) in collectList" :key="index">

      <div class="list-item" @click="onListItemClick(item,index)">

        <p class="list-item-title">{{ item.title }}</p>

        <div class="list-item-content">
          <p>作者：{{ item.author || item.shareUser }}</p>
          <p>分类：{{ item.superChapterName }}/{{ item.chapterName }}</p>
        </div>
        <p>时间：{{ item.niceDate }}</p>
      </div>

    </li>
  </div>
</template>

<script>
import api from "../../api";
import launch from "../../utils/launch";
import toast from "../../utils/toast";

export default {
  data() {
    return {
      collectList: [],
      pageCount: 0
    };
  },

  components: {},

  methods: {
    async getList() {
      const res = await api.collectList(this.pageCount);
      if (res.datas) {
        this.collectList = res.datas;
      }
    },
    //列表点击事件
    onListItemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.link });
    }
  },
  onLoad() {
    this.getList();
  },
  created() {

  }
};
</script>

<style scoped>


.list-item {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}

.list-item-title {
  font-size: 18px;
}

.list-item-content {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
