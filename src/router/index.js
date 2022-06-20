import { createRouter, createWebHistory } from "vue-router"

// import Vue from "vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView"
import MyPageView from "@/views/MyPage.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/myPage",
    name: "mypage",
    component: MyPageView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
