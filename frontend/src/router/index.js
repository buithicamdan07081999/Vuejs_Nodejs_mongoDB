import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/auth/router/authRoutes";
import userRoutes from "@/user/router/userRoutes";
import adminRoutes from "@/admin/router";
import cartRoutes from "@/cart/router";

const routesOperator = [
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...cartRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesOperator,
});

export default router;