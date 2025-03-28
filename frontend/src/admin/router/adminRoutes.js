import AdminDashboard from "@/admin/views/AdminDashboard.vue";
import ProductManager from "@/admin/views/ProductManager.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: AdminDashboard,
    children: [
      { path: "products", component: ProductManager }, // /admin/products
    ],
  },
];

export default adminRoutes;
