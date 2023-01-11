<template>
  <topNav></topNav>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import topNav from "./components/topNav.vue";
export default {
  components: {
    topNav,
  },
  setup() {
    return {
      title: "create Vue3",
    };
  },
};
</script>
<style scoped lang="less">
.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  height: 100%;
}
</style>
