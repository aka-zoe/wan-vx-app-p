<template>
  <div>
    <div class="horizontal-tab-list-container">
      <scroll-view
        class="horizontal-tab-list"
        scroll-x
        enable-flex
        scroll-with-animation
      >
        <div
          v-for="(item, index) in tabs"
          :key="item.id"
          class="tab-list-item"
          :class="{ active: currentTab === index }"
          @click="onTabChange(index)"
        >
          <p class="tab-item-title" v-html="item.title"></p>
          <!--            <div class="item-title">{{ item.title }}</div>-->
        </div>
      </scroll-view>
    </div>

    <div>

      <div class="horizontal-proj-list-container">
        <scroll-view
          class="scrollable-proj-list"
          scroll-x
          enable-flex
          scroll-with-animation
        >
          <div
            v-for="(item, index) in contentData"
            :key="index"
            class="child-list-item-container"
            :class="{ active: currentTab === index }"
            @click="onTabChange(index)"
          >
            <div class="child-list-item" @click="itemClick(item)">
              <div class="child-list-item-text" style="font-size: 18px;margin-bottom: 10px">{{ item.title }}</div>
              <img class="child-list-image" :src="item.envelopePic" alt="image" />
              <div class="child-list-item-text" style="font-size: 14px;color: gray;">{{ item.desc }}</div>
            </div>
          </div>
        </scroll-view>

      </div>

    </div>

  </div>

</template>

<script>

import api from "../../api";
import launch from "../../utils/launch";
import iModal from 'iview-mpvue/dist/components/modal/modal'

export default {
  data() {
    return {
      'i-modal': iModal,
      showModal:false,
      actions3: [
        {
          name: '文章链接',
          color: '#2d8cf0',
        },
        {
          name: '项目源码',
          color: '#19be6b'
        },
        {
          name: '取消'
        }
      ],
      tabs: [], // tabs 数据
      currentTab: 0, // 当前选中的 tab 索引
      contentData: [] // 当前 tab 的内容数据
    };
  },

  components: {},

  methods: {
    handleClick3(evt) {
      console.log(`handleClick3`)
      const index = evt.index
      if (index === 0) {

      }
      else if (index === 1) {

      }
      this.showModal = false
    },
    onTabChange(index) {
      if (this.currentTab !== index) {
        this.currentTab = index; // 更新当前 tab
        //获取项目列表
        this.getProjectList(this.tabs[index].id);
      }
    },
    itemClick(item) {
      // this.showModal = true;
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
.horizontal-tab-list-container {
  width: 100%;
  height: 40px;
  overflow: hidden;
}

.horizontal-tab-list {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  height: 40px;
  padding: 10px 0;
}

.tab-list-item {
  display: inline-block;
  flex-shrink: 0;
  height: 30px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  position: relative; /* 为底部横线定位 */
}

.tab-item-title {
  margin-top: 5px;
  font-size: 18px;
  color: #333;
}

.list-item.active .tab-item-title {
  color: #007aff; /* 选中状态字体颜色 */
}

.tab-list-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #007aff; /* 底部横线颜色 */
}

.horizontal-proj-list-container {
  width: 100%;
  height: 900px;
  overflow: hidden;
}

.scrollable-proj-list {
  display: flex;
  height: 900px;
  flex-direction: row;
}

.child-list-item-container {
  alignment: center;
  width: 300px;
  white-space: nowrap;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000; /* 圆圈边框 */
}

.child-list-item {
  width: 300px;
}

.child-list-item-text {
  width: 300px;
  word-wrap: break-word; /* 强制长单词换行 */
  overflow-wrap: break-word; /* 浏览器兼容 */
  white-space: normal; /* 允许换行 */
}

.child-list-image {
  margin-left: 25px;
  width: 250px;
  height: 500px;
}

</style>
