<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tab></Tab>
  </div>
</template>
<script>
import Tab from "./components/Tab.vue";

export default {
  components: {
    Tab
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.content {
  position: fixed;
  top: 40px;
  bottom: 50px;
  width: 100%;
  overflow: auto;
}
</style>
