import { createRouter, createWebHistory } from 'vue-router';

// B1: import
import HomeView from '@/views/HomeView.vue';  //phai tao trang HomeView trước
import ProductsView from '@/views/ProductsView.vue'; //phai tao trang ProductsView trước
import ProductDetailView from "@/views/ProductDetailView.vue";


// B2: Tạo đường dẫn
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/products', name: 'Products', component: ProductsView },
  { path: "/product/:id", component: ProductDetailView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
