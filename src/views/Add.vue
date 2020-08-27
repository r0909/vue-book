<template>
  <div>
    <ComHeader :back="true">添加</ComHeader>
    <ul>
      <li>
        <label for="bookCover">图书封面</label>
        <input type="text" v-model="book.bookCover" id="bookCover" />
      </li>
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
        <button @click="add">确认添加</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ComHeader from "../components/ComHeader";
import { addBook } from "../api";

export default {
  components: {
    ComHeader
  },
  data() {
    return {
      book: {}
    };
  },
  methods: {
    async add() {
      await addBook(this.book);
      this.$router.push("/list");
    }
  }
};
</script>

<style lang="less" scoped>
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
