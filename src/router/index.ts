/**
 * 系统的路由配置
 */

import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
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
  history: createWebHistory(),
  routes,
});

export default router;
