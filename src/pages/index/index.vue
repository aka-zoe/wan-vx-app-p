<template>
  <div class="root">

    <div class="banner-container">

      <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="500"
        @change="onSwiperChange"
      >
        <swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item">
          <img class="banner-image" @click="bannerItemClick(item)" :src="item.imagePath" alt="banner" />
        </swiper-item>
      </swiper>

    </div>

    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in homeListData" :key="index">
          <div class="list-item" @click="itemClick(item)">
            <div class="item-child">
              <p class="item-title" :style="{color:item.type===1?topColor:normalColor}">{{ item.title }}</p>
            </div>
            <div class="item-child">
              <p style="margin-right: 10px">作者:{{ item.author || item.shareUser }}
              <p>分类:{{ item.superChapterName }}/{{ item.chapterName }}</p>
            </div>
            <div class="item-child">
              <p>时间：{{ item.niceDate }}</p>
            </div>

          </div>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import toast from "../../utils/toast";
import api from "@/api/index";
import launch from "../../utils/launch";

export default {
  data() {
    return {
      page: 0,          // 当前页数
      loading: false,   // 是否正在加载
      hasMore: true,    // 是否还有更多数据
      bannerList: [],
      homeListData: [],
      topColor: "#de1919",
      normalColor: "#000"
    };
  },

  components: {},

  methods: {
    async getBanner() {
      this.bannerList = await api.homeBanner();
    },
    async fetchHomeList(isRefresh = false) {
      if (isRefresh) {
        // 刷新时重置数据
        await this.homeList();
      } else {
        await this.loadMoreHomeList();
      }
    },
    //获取首页文章
    async homeList() {
      const topRes = await api.homeTopDocList();
      const docRes = await api.homeDocList(0);
      this.homeListData = [...topRes, ...docRes.datas];
    },
    //获取分页首页文章
    async loadMoreHomeList() {
      const docRes = await api.homeDocList(this.page);
      if (docRes) {
        this.homeListData = [...this.homeListData, ...docRes.datas];
        return true;
      }
      //没有数据页码-1
      this.page--;
      return false;
    },

    refreshList() {
      this.page = 0;
      this.fetchHomeList(true);
    },
    loadMore() {
      this.page++;
      this.fetchHomeList();
    },
    //banner轮播事件
    onSwiperChange(event) {
    },
    bannerItemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.url });
    },
    //列表点击事件
    itemClick(item) {
      //跳转到webview
      launch.navigateTo("/pages/webview/main", { url: item.link });
    }
  },
  //处理下拉刷新
  onPullDownRefresh() {
    this.refreshList();
    wx.stopPullDownRefresh();
  },
  //处理上拉加载更多
  onReachBottom() {
    this.loadMore();
  },
  created() {
    this.getBanner();
    this.fetchHomeList(true);
  }
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.swiper{
  height: 200px;
}
.banner-image {
  width: 100%;
  height: 200px;
}

.scrollable-list {
  flex: 1; /* 让 scrollable-list 占满剩余空间 */
  overflow-y: auto; /* 使得容器内的内容可以垂直滚动 */
}

.scrollable-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
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
  margin-left: 20px;
  margin-top: 18px;
  margin-right: 15px;
}

.item-title {
  font-size: 18px;
}
</style>
