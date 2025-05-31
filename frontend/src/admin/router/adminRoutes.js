import MainLayout from "@/admin/views/MainLayout.vue";
// ĐƯỜNG DẪN USER CẦN NHẬP
// Gửi request đến backend
// Nhận data và render bảng danh sách
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
      //UserList
      {
        path: 'userslist',
        name: 'UsersList',
        component: () => import('@/admin/components/Auth/UserList.vue'),
      },
      {
        path: 'adduser',
        name: 'AddUser',
        component: () => import('@/admin/components/Products/AddProduct.vue')
      },
      {
        path: 'update/user/:id',
        name: 'EditUser',
        component: () => import('@/admin/components/Auth/UpdateUser.vue'),
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
        path: 'Orders',
        name: 'Orders',
        component: () => import('@/admin/components/Order/OrdersPage.vue'),
      },

      // Category
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/admin/components/Categories/CategoryPage.vue'),
      },
      {
        path: 'categories/add',
        name: 'Addcategories',
        component: () => import('@/admin/components/Categories/AddCategory.vue'),
      },
      {
        path: 'categories/edit/:id',
        name: 'Editcategories',
        component: () => import('@/admin/components/Categories/UpdateCategory.vue'),
      }
    ]
  }
];

export default Routes;
