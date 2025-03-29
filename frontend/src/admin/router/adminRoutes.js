import AdminDashboard from "@/admin/views/AdminDashboard.vue";
import ProductList from "@/admin/views/ProductList.vue";

const adminRoutes = [
  // ADD dữ liệu API,
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/admin/Products', name: 'ProductList', component: ProductList },
]

export default adminRoutes;
