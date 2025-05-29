import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "@/user/router/userRoutes";
import adminRoutes from "@/admin/router/adminRoutes";
import authRoutes from "@/auth/router"; 

const routesOperator = [
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesOperator,
});

export default router;
