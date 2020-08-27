<template>
  <div>
    <ComHeader :back="false">列表页</ComHeader>
    <div class="content" ref="scroll" @scroll="loadMore" >
      <ul>
        <router-link
          v-for="item in books"
          :key="item.id"
          :to="{ name: 'detail', params: { id: item.bookId } }"
          tag="li"
        >
          <img :src="item.bookCover" alt="" />
          <div class="info">
            <h4>{{ item.bookName }}</h4>
            <p>{{ item.bookInfo }}</p>
            <b>¥{{ item.bookPrice }}</b>
            <button @click.stop="remove(item.bookId)">删除</button>
          </div>
        </router-link>
      </ul>

      <div class="more" @click="more">加载更多</div>
    </div>
  </div>
</template>

<script>
import ComHeader from "../components/ComHeader";
import { pagination, removeBook,getBooks } from "../api";
import { setTimeout, clearTimeout, setInterval } from "timers";
export default {
  data() {
    return {
      books: [],
      offset: 0,
      hasMore: true,
      isLoading: false
    };
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      if (this.hasMore && !this.isLoading) {
        this.isLoading = true;
        let { hasMore, books } = await pagination(this.offset);
        this.books = [...this.books, ...books];
        this.hasMore = hasMore;
        this.isLoading = false;
        this.offset = this.books.length;
      }
    },
    async remove(id) {
      await removeBook(id);

      // this.books.filter(item => item.bookId !== id);

      this.books = await getBooks();
    },
    more() {
      this.getData();
    },
    loadMore() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getData();
        }
      }, 50);
    }
  },
  components: {
    ComHeader
  }
};
</script>

<style lang="less" scoped>
.content ul {
  padding: 10px;
}
.content ul li {
  display: flex;
  width: 100%;
  padding: 20px;
}
li:not(:last-child) {
  border-bottom: 1px solid #f1f1f1;
}
.content ul li img {
  width: 50%;
}
.content ul li .info {
  width: 50%;
}
.content h4 {
  line-height: 35px;
  padding-top: 5px;
}
.content p {
  line-height: 25px;
}
.content h4,
.content p {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: clip;
}
.content b {
  color: red;
  line-height: 25px;
}
.content button {
  display: block;
  width: 60px;
  height: 35px;
  background-color: orange;
  border: none;
  border-radius: 15px;
  outline: none;
}
.more {
  background: blueviolet;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 18px;
  margin: 10px;
}
</style>
