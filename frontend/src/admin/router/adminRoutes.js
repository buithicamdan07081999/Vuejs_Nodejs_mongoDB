import Siderbar from "@/admin/views/Sidebar.vue";
import Dashboard from "@/admin/views/Dashboard.vue";
import ProductList from "@/admin/views/ProductList.vue";

const Routes = [
  {
    path: '/admin',
    component: Siderbar, // dùng layout làm wrapper
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'ProductList',
        component: ProductList
      }
    ]
  }
];

export default Routes;
