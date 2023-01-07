<template>
  <div class="app" title="app">
    <h1>{{ title }}</h1>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    return {
      title: "create Vue3",
    };
  },
};
</script>
<style scoped lang="less">
.app {
  margin: 0;
}
</style>
