import MainLayout from "@/admin/views/MainLayout.vue";
import Dashboard from "@/admin/views/Dashboard.vue";
import ProductList from "@/admin/views/ProductList.vue";
import OrdersPage from "@/admin/views/OrdersPage.vue";

const Routes = [
  {
    path: '/admin',
    component: MainLayout,
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
      },
      {
        path: 'OrdersPage',
        name: 'OrdersPage',
        component: OrdersPage
      }
    ]
  }
];

export default Routes;
