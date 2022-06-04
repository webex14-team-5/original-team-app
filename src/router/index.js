import { createRouter, createWebHistory } from "vue-router"
// import Vue from "vue"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView"
import PlacesApiView from "@/views/PlacesApiView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/places",
    name: "places",
    component: PlacesApiView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
