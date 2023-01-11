<template>
  <div class="layout">
    <div class="nav">
      <!-- 首页图标 -->
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="index" @click="toLayoutPage('index')">
          <template #icon>
            <home-outlined />
          </template>
          首页
        </a-menu-item>
        <a-menu-item key="order" @click="toLayoutPage('order')">
          <template #icon>
            <profile-outlined />
          </template>
          订单
        </a-menu-item>

        <a-menu-item key="user" @click="toLayoutPage('user')">
          <template #icon>
            <user-outlined />
          </template>
          个人中心
        </a-menu-item>
        <!-- v-if="isAdmin" -->
        <a-menu-item key="admin" @click="toLayoutPage('admin')">
          <template #icon>
            <user-outlined />
          </template>
          管理员
        </a-menu-item>
      </a-menu>

      <!-- 文档 -->
      <!-- github -->
    </div>
    <RouterView />
  </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    HomeOutlined,
    ProfileOutlined,
    UserOutlined,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let isAdmin = ref<boolean>(store.state.user.isAdmin);
    console.log(isAdmin);
    let rpath = router.currentRoute.value.path;
    let current = ref<string[]>([rpath.split("layout/")[1]]);
    console.log(current.value);
    const toLayoutPage = (layoutpage: string) => {
      router.push(`/layout/${layoutpage}`);
    };
    return {
      current,
      toLayoutPage,
      isAdmin,
    };
  },
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
}
.nav {
  width: 80vw;
  height: 70px;
  line-height: 70px;
}
</style>
