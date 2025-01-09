<template>
  <div>
    <div class="title">
      鸿蒙常用开源库
    </div>
    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in openSourceList" :key="index">
          <div class="list-item" @click="itemClick(item)">
            <p class="item-title">{{ item.title }}</p>
            <p style="margin-left: 10px;margin-right: 10px">{{ item.desc }}</p>
            <div class="item-child">
              <p style="margin-right: 10px">作者:{{ item.author }}</p>
              <p>分类:{{ item.chapterName }}</p>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="title">
      鸿蒙常用链接
    </div>
    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in linksList" :key="index">
          <div class="list-item" @click="itemClick(item)">
            <p class="item-title">{{ item.title }}</p>
            <p style="margin-left: 10px;margin-right: 10px">{{ item.desc }}</p>
            <div class="item-child">
              <p style="margin-right: 10px">作者:{{ item.author }}</p>
              <p>分类:{{ item.chapterName }}</p>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="title">
      鸿蒙常用工具
    </div>
    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in toolList" :key="index">
          <div class="list-item" @click="itemClick(item)">
            <p class="item-title">{{ item.title }}</p>
            <p style="margin-left: 10px;margin-right: 10px">{{ item.desc }}</p>
            <div class="item-child">
              <p style="margin-right: 10px">作者:{{ item.author }}</p>
              <p>分类:{{ item.chapterName }}</p>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import launch from "../../utils/launch";

export default {
  data() {
    return {
      toolList: [],
      openSourceList: [],
      linksList: []
    };
  },

  components: {},

  methods: {
    async getList() {
      const harmonyData = await api.harmonyList();
      if (harmonyData) {
        this.toolList = harmonyData.tools.articleList;
        this.openSourceList = harmonyData.open_sources.articleList;
        this.linksList = harmonyData.links.articleList;
      }
    },
    //列表点击事件
    itemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.link });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.title {
  margin-top: 15px;
  font-size: 23px;
  margin-left: 15px;
  color: cadetblue;
}

.scrollable-list {
  flex: 1; /* 让 scrollable-list 占满剩余空间 */
  overflow-y: auto; /* 使得容器内的内容可以垂直滚动 */
}

.list-item {
  border: 1px solid #000; /* 圆圈边框 */
  margin: 10px;
  padding-bottom: 10px;
}

.item-child {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-top: 18px;
  margin-right: 15px;
}

.item-title {
  margin: 10px;
  font-size: 20px;
}
</style>
