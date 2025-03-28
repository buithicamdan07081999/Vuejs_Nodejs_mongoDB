import { createRouter, createWebHistory } from 'vue-router';

// B1: import các thư mục nằm trong views
// TEST
import IndexRaw from '@/user/views/IndexRaw.vue';
// OFFICAL
// import AdminView from '@/views/AdminView.vue';
import HomeView from '@/user/views/HomeView.vue';
import ProductsView from '@/user/views/ProductsView.vue';
import ProductsDetailView from '@/user/views/ProductsDetailView.vue';

// B2: Tạo đường dẫn
const UserRoutes = [
  // gán cứng - TEST GIAO DIỆN - DONE
  { path: '/IndexRaw', name: 'IndexRaw', component: IndexRaw },

  // ADD dữ liệu API,
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/Products/', name: 'ProductsView', component: ProductsView },
  { path: '/Products/:id', name: 'ProductsDetailView', component: ProductsDetailView },

]
const UserRoute = createRouter({
  history: createWebHistory(),
  routes: UserRoutes,
});

export default UserRoute;
