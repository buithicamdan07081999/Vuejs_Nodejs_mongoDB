import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "@/user/router/userRoutes";
import adminRoutes from "@/admin/router/adminRoutes";

const routesOperator = [...userRoutes, ...adminRoutes];
console.log(routesOperator);
// Dùng spread operator (...) để gộp 2 mảng routes lại với nhau.
// Sau khi gộp, routes sẽ là:
// [
//   { path: "/", component: Home },
//   { path: "/products", component: Products },
//   { path: "/admin", component: Dashboard },
//   { path: "/admin/products", component: ManageProducts }
// ]
const router = createRouter({
  history: createWebHistory(),
  routes: routesOperator,
});

export default router;
