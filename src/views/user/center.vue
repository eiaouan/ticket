<template>
  <div>
    <a-card>
      <div class="username"><user-outlined /> {{ userInfo.userName }}</div>
      <div class="loginName">账号: {{ userInfo.loginName }}</div>
    </a-card>
    <a-card>
      <a-button class="layout" @click="layout">退出</a-button>
      <!-- <a-button type="danger" @click="changePassword">修改密码</a-button> -->
    </a-card>
  </div>
</template>
<script lang="ts">
import { getUserInfo, userLayout } from "@/api/user";
import { ref, onMounted, createVNode } from "vue";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import store from "@/store";
export default {
  components: {
    UserOutlined,
  },
  setup() {
    const router = useRouter();
    let userInfo = ref({
      userName: "用户1",
      loginName: "123456",
    });
    const updateUserInfo = async () => {
      let res = await getUserInfo();
      if (res.data.status == 20000) {
        userInfo.value = res.data.data;
        console.log(userInfo);
      }
    };
    const layout = async () => {
      Modal.confirm({
        title: "Confirm",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确认退出",
        okText: "退出",
        cancelText: "取消",
        onOk: async () => {
          let res = await userLayout();
          console.log("layout", res);
          if (res.data.status == 20000) {
            console.log("退出");
            // 删除token
            localStorage.setItem("token", "");
            // 删除user中的token 和 isAdmin
            store.commit("user/CLEAN_USER_INFO");
            console.log(store.state);
            router.push("/login");
            // 进行拦截
          }
        },
      });
    };
    // const changePassword = ()=>{

    // }
    onMounted(() => {
      updateUserInfo();
    });
    return {
      userInfo,
      layout,
      // changePassword
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  margin: 10px;
}
</style>
