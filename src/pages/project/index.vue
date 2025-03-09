<template>
  <div>
    <div class="tab-container">
      <scroll-view class="tab-bar" scroll-x enable-flex>
        <div
          class="tab-bar-item"
          v-for="(item, index) in tabs"
          :key="item.id"
          :class="{ active: currentTab === index }"
          @click="onTabChange(index)"
        >
          <p class="tab-bar-item-title" v-html="item.title"></p>
        </div>
      </scroll-view>
    </div>

    <li class="content-list" v-for="(item,index) in contentData" :key="index">
      <div class="content-list-item" @click="itemClick(item)">
        <div class="image-container">
          <img class="list-item-img" :src="item.envelopePic"></img>
        </div>

        <div class="content-list-item-column">
          <div class="list-item-title"> {{ item.title }}</div>
          <div> {{ item.desc }}</div>
          <div class="list-item-date"> {{ item.niceDate }}</div>
        </div>

      </div>

    </li>
  </div>

</template>

<script>

import api from "../../api";
import launch from "../../utils/launch";

export default {
  data() {
    return {
      tabs: [], // tabs 数据
      currentTab: 0, // 当前选中的 tab 索引
      contentData: [] // 当前 tab 的内容数据
    };
  },

  components: {},

  methods: {
    onTabChange(index) {
      if (this.currentTab !== index) {
        this.currentTab = index; // 更新当前 tab
        //获取项目列表
        this.getProjectList(this.tabs[index].id);
      }
    },
    itemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.link });
    },
    async projectType() {
      const datas = await api.projectType();
      if (datas) {
        this.tabs = [];
        this.tabs = datas.map(item => ({
          id: item.id,
          title: item.name // 与模板的字段匹配
        }));
        if (this.tabs.length > 0) {
          await this.getProjectList(this.tabs[0].id);
        }
      }
    },
    async getProjectList(id) {
      const data = await api.projectList(id);
      if (data && data.datas) {
        this.contentData = data.datas;
      }
    }
  },
  onLoad() {
    this.projectType();
  }
};
</script>

<style scoped>
.tab-container {
  width: 100%;
  height: 40px;
}

.tab-bar {
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 10px;
}

.tab-bar-item {
  flex-shrink: 0;
  height: 30px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  position: relative; /* 为底部横线定位 */
}

.tab-bar-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #007aff; /* 底部横线颜色 */
}

.tab-bar-item-title {
  margin-top: 5px;
  font-size: 18px;
  color: #333;
}

.content-list {
  padding: 10px;
}

.content-list-item {
  border-bottom: 1px dashed #ddd;
}

.content-list-item-column {
  margin-bottom: 10px;
}

.image-container {
  width: 100%; /* 或者指定宽度 */
  height: 100px;
  overflow: hidden; /* 超出部分隐藏 */
  position: relative;
}

.list-item-img {
  width: 100%; /* 让图片宽度适应容器 */
  position: absolute;
  top: 0; /* 从顶部显示 */
  left: 0;
}

.list-item-title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
}

.list-item-date {
  text-align: end;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
