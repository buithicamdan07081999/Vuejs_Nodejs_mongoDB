import { createRouter, createWebHistory } from 'vue-router';

// B1: import các thư mục nằm trong views
// TEST
import IndexRaw from '@/views/IndexRaw.vue';
import ProductsViewRaw from "@/views/ProductsViewRaw.vue";
import ProductsDetailViewRaw from '@/views/ProductsDetailViewRaw.vue';
// OFFICAL
import AdminView from '@/views/AdminView.vue';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/ProductsView.vue';

// B2: Tạo đường dẫn
const routes = [
  // gán cứng - TEST GIAO DIỆN - DONE
  { path: '/IndexRaw', name: 'IndexRaw', component: IndexRaw },
  { path: '/ProductsViewRaw', name: 'ProductsViewRaw', component: ProductsViewRaw }, 
  { path: '/ProductsDetailViewRaw/:id', name: 'ProductsDetailViewRaw', component: ProductsDetailViewRaw },

  // ADD dữ liệu API
  // { path: '/', name: 'Index', component: Index }, // tên trong views
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/AdminView', name: 'AdminView', component: AdminView },
  { path: '/Products/:id', name: 'ProductPageView', component: ProductsView },

]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
