import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import CheckGenerator from "../views/CheckGenerator.vue"

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/generate-check",
    name: "CheckGenerator",
    component: CheckGenerator,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated || localStorage.getItem("authToken")

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login")
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/dashboard")
  } else {
    next()
  }
})

export default router
