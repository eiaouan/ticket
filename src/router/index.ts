/**
 * 系统的路由配置
 */

import {
  createWebHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import { message } from "ant-design-vue";
const routes = [
  {
    path: "/",
    redirect: "/layout/index",
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/login/register.vue"),
  },
  // {
  //   path: "/test",
  //   component: () => import("@/views/test/index.vue"),
  // },
  {
    path: "/layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/index/index.vue"),
      },
      {
        path: "order",
        component: () => import("@/views/order/index.vue"),
      },
      {
        path: "user",
        component: () => import("@/views/user/center.vue"),
      },
      {
        path: "admin",
        component: () => import("@/views/admin/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || to.path == "/register") {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = localStorage.getItem("token");
    // token 不存在
    if (token === null || token === "") {
      message.error("您还没有登录，请先登录");
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
