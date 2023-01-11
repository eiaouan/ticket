<template>
  <div class="login-page">
    <div class="register login">
      <div class="login-title">注册</div>
      <div class="formdata">
        <input
          type="text"
          v-model="formdata.loginName"
          placeholder="输入账号"
        />
        <input type="password" v-model="formdata.password" placeholder="密码" />
        <input
          type="password"
          v-model="repeatPassword"
          placeholder="再次输入密码"
        />
        <input type="text" v-model="formdata.username" placeholder="用户名" />
      </div>
      <div class="login-btn" @click="registerFun">注册</div>
      <div class="login-btn" @click="toLogin">注册</div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import { register } from "@/api/user";
import router from "@/router";
export default {
  setup() {
    let formdata = ref({
      loginName: "",
      username: "",
      password: "",
    });
    let repeatPassword = ref("");
    let registerFun = async () => {
      if (formdata.value.username.trim() == "") {
        message.error("输入账号名称");
        return;
      }
      if (
        formdata.value.password.trim() == "" ||
        repeatPassword.value.trim() == ""
      ) {
        message.error("输入账号名称");
        return;
      } else if (
        formdata.value.password.trim() != repeatPassword.value.trim()
      ) {
        message.error("两次输入密码不一致");
        return;
      }
      let res = await register(formdata.value);
      if (res.data.status == 20000) {
        message.success("注册成功");
        // 转跳到登录界面
        router.push("/login");
      } else {
        message.error(res.data.message);
      }
    };
    const toLogin = () => router.push("/login");

    return {
      registerFun,
      formdata,
      repeatPassword,
      toLogin,
    };
  },
};
</script>
<style lang="less" scoped>
.login-page {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  // height: 300px;
  border: 1px solid #5f3cc0;
  border-radius: 7px;
  text-align: center;
}

.login-title {
  margin: 20px 0;
  font-size: 20px;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
  color: #5f3cc0;
}

.formdata {
  input {
    display: block;
    border: none;
    height: 30px;
    margin: 10px 0;
    outline: 1px solid transparent;
    border-radius: 5px;
    padding-left: 10px;
    border-bottom: solid 1px #5f3cc0;
    &:hover,
    &:focus,
    &:focus-visible {
      outline: 1px solid #5f3cc0;
    }
  }
}

.login-btn {
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: #5f3cc0;
  color: #fff;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    background: #4c3098;
  }
}
</style>
