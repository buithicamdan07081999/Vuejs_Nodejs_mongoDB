import MainLayout from "@/admin/views/MainLayout.vue";

const Routes = [
  {
    path: '/admin',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component:  () => import('@/admin/views/Dashboard.vue'), 
      },
      {
        path: 'products',
        name: 'ProductList',
        component:  () => import('@/admin/views/ProductList.vue'), 
      },
      {
        path: 'OrdersPage',
        name: 'OrdersPage',
        component: () => import('@/admin/views/OrdersPage.vue'),
      }
    ]
  }
];

export default Routes;
