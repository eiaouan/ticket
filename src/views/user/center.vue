<template>
  <div>
    <a-card>
      <div class="username"><user-outlined />{{ userInfo.username }}</div>
      <div class="loginNmae">账号: {{ userInfo.loginNmae }}</div>
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
export default {
  components: {
    UserOutlined,
  },
  setup() {
    let userInfo = ref({
      username: "用户1",
      loginNmae: "123456",
    });
    const updateUserInfo = async () => {
      let res = await getUserInfo();
      if (res.data.status == 20000) {
        userInfo.value = res.data.data;
      }
    };
    const layout = async () => {
      Modal.confirm({
        title: "Confirm",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确认退票",
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          let res = await userLayout();
          if (res.data.status == 20000) {
            console.log("退出");
            // 删除token
            // 进行拦截
          }
        },
      });
    };
    // const changePassword = ()=>{

    // }
    onMounted(() => {
      // updateUserInfo()
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
