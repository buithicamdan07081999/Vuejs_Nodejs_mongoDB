import MainLayout from "@/admin/views/MainLayout.vue";

const Routes = [
  {
    path: '/admin',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/admin/components/Pages/Dashboard.vue'),
      },
      // Product
      {
        path: 'products',
        name: 'products',
        component: () => import('@/admin/components/Products/ProductPage.vue'),
      },
      {
        path: 'products/add',
        name: 'AddProduct',
        component: () => import('@/admin/components/Products/AddProduct.vue')
      },
      {
        path: 'products/edit/:id',
        name: 'EditProduct',
        component: () => import('@/admin/components/Products/UpdateProduct.vue'),
      },
      // Order
      {
        path: 'OrdersPage',
        name: 'OrdersPage',
        component: () => import('@/admin/components/Order/OrdersPage.vue'),
      },

      // Category
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/admin/components/Categories/CategoryPage.vue'),
      },
    ]
  }
];

export default Routes;
