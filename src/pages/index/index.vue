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
          <img class="banner-image" :src="item.imagePath" alt="banner" />
        </swiper-item>
      </swiper>

    </div>

    <div class="scrollable-list">
      <ul>
        <li v-for="(item, index) in homeListData" :key="index">
          <div class="item">
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import toast from "../../utils/toast";
import api from "@/api/index";

export default {
  data() {
    return {
      page: 0,          // 当前页数
      loading: false,   // 是否正在加载
      hasMore: true,    // 是否还有更多数据
      bannerList: [],
      homeListData: []
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
    this.fetchHomeList();
  }
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 120px;
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

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-top: 18px;
}
</style>
