import { createRouter, createWebHistory } from 'vue-router';

// B1: import các thư mục nằm trong views
// TEST
import IndexRaw from '@/views/IndexRaw.vue';
// OFFICAL
// import AdminView from '@/views/AdminView.vue';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/ProductsView.vue';
import ProductsDetailView from '@/views/ProductsDetailView.vue';

// B2: Tạo đường dẫn
const routes = [
  // gán cứng - TEST GIAO DIỆN - DONE
  { path: '/IndexRaw', name: 'IndexRaw', component: IndexRaw },

  // ADD dữ liệu API,
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/Products/', name: 'ProductsView', component: ProductsView },
  { path: '/Products/:id', name: 'ProductsDetailView', component: ProductsDetailView },

]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
