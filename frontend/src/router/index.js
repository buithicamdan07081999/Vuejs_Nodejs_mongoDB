import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "@/user/router/userRoutes";
import adminRoutes from "@/admin/router/adminRoutes";

const routes = [...userRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
