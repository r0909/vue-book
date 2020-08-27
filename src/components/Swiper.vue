<template>
  <div class='wrapper'>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img :src="slide" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable:true,
        },
        loop: true,
        observer: true,
        bserveParents: true,
        autoplay: 2000,
        setWrapperSize: true
      }
    };
  },
  props: {
    swiperSlides: Array
  }
};
</script>

<style lang="less" scoped>

img {
  width: 100%;
}
</style>
