<template>
  <div class="detail">
    <ComHeader :back="true">详情页</ComHeader>
    <ul>
      <li>
        <label for="bookName">图书名称</label>
        <input type="text" v-model="book.bookName" id="bookName" />
      </li>
      <li>
        <label for="bookInfo">图书信息</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo" />
      </li>
      <li>
        <label for="bookPrice">图书价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice" />
      </li>
      <li>
        <button @click="update">确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ComHeader from "../components/ComHeader";
import { findOneBook, updateBook } from "../api";
export default {
  components: {
    ComHeader
  },
  created() {
    this.getData();
  },
  data() {
    return {
      book: {}
    };
  },
  methods: {
    async getData() {
      this.book = await findOneBook(this.id);
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push("/list");
    },
    async update() {
      await updateBook(this.id, this.book);
      this.$router.push("/list");
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: white;
}
ul {
  margin: 50px 10px 10px 10px;
  li {
    label {
      display: block;
    }
    input {
      width: 100%;
      margin: 10px 0;
      height: 25px;
    }
    button {
      display: block;
      width: 100%;
      height: 35px;

    }
  }
}
</style>
