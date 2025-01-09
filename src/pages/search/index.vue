<template>
  <div>
    <mp-searchbar :isFocus=true
                  v-model="inputValue"
                  :placeholder="placeholder"
                  @on-input="onInputChange"
                  @confirm="confirmSearch"
    ></mp-searchbar>

    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in dataList" :key="index">
          <div class="list-item" @click="itemClick(item)">
            <p v-html="item.title"></p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mpSearchbar from "mpvue-weui/src/searchbar";
import api from "../../api";
import launch from "../../utils/launch";

export default {
  data() {
    return {
      inputValue: "",
      placeholder: "请输入搜索的内容",
      dataList: []
    };
  },

  components: {
    mpSearchbar
  },

  methods: {
    onInputChange(event) {
      console.log(`输入：${this.inputValue}`);
    },
    confirmSearch(event) {
      this.searchData();
    },
    async searchData() {
      const data = await api.search(this.inputValue);
      if (data) {
        this.dataList = data.datas;
      }
    },
    //列表点击事件
    itemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.link });
    }
  },

  created() {

  }
};
</script>

<style scoped>
.scrollable-list {
  flex: 1; /* 让 scrollable-list 占满剩余空间 */
  overflow-y: auto; /* 使得容器内的内容可以垂直滚动 */
}

.list-item {
  padding: 10px;
  border: 1px solid #4ed4c2; /* 圆圈边框 */
  margin: 10px;
}

</style>
