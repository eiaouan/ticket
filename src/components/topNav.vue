<template>
  <div class="topNav">
    <div class="title-content" @click="toIndex">
      <img src="../assets/webpack.jpg" alt="" class="logo" />
      <div class="title">高铁车票管理系统</div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const toIndex = () => {
      router.push("/");
    };
    return {
      toIndex,
    };
  },
};
</script>
<style lang="less" scoped>
.topNav {
  width: 100%;
  box-shadow: 0 3px 3px #ccc;

  .title-content {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
  .logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .title {
    display: inline-block;
    font-size: 25px;
    font-weight: 700;
    vertical-align: middle;
  }
}
</style>
