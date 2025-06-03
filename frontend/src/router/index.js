import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "@/user/router/userRoutes";
import adminRoutes from "@/admin/router"; // <- không dùng dấu {}

const routesOperator = [
  ...userRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesOperator,
});

export default router;