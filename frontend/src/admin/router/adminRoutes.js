import MainLayout from "@/admin/views/MainLayout.vue";
import Dashboard from "@/admin/views/Dashboard.vue";
import ProductList from "@/admin/views/ProductList.vue";

const Routes = [
  {
    path: '/admin',
    component: MainLayout, // dùng layout làm wrapper
    children: [
      {
        path: '',
        name: 'Dashboard',
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
