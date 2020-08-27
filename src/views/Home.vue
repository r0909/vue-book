<template>
  <div>
    <ComHeader :back="false">首页</ComHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="item in hotBooks" :key="item.id">
              <img :src="item.bookCover" alt="" />
              <b>{{ item.bookName }}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ComHeader from "../components/ComHeader";
import Swiper from "../components/Swiper";
import Loading from "../components/Loading";

import { getAll } from "../api/index";
export default {
  components: {
    ComHeader,
    Swiper,
    Loading
  },
  created() {
    this.getData();
  },
  data() {
    return {
      sliders: [],
      hotBooks: [],
      loading: true
    };
  },
  methods: {
    async getData() {
      let [sliders, hotBooks] = await getAll();
      this.sliders = sliders;
      this.hotBooks = hotBooks;
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 90%;
  margin: 0 auto;
  h3 {
    padding: 10px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    li {
      width: 50%;
      text-align: center;
      margin: 5px 0;
      img {
        width: 80%;
        display: block;
        margin: 10px auto;
      }
    }
  }
}
</style>
