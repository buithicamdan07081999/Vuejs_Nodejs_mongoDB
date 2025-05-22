import MainLayout from "@/admin/views/MainLayout.vue";

const Routes = [
  {
    path: '/admin',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/admin/views/Dashboard.vue'),
      },
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('@/admin/views/ProductList.vue'),
      },
      {
        path: 'products/edit/:id',
        name: 'EditProduct',
        component: () => import('@/admin/views/UpdateProduct.vue'),
      },
      {
        path: 'OrdersPage',
        name: 'OrdersPage',
        component: () => import('@/admin/views/OrdersPage.vue'),
      },
      {
        path: 'products/add',
        name: 'AddProduct',
        component: () => import('@/admin/components/Products/AddProduct.vue')
      },
      // Category
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/admin/views/UpdateCategory.vue'),
      },
    ]
  }
];

export default Routes;
