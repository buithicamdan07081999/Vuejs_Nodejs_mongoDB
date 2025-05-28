import HomeView from '@/user/views/HomeView.vue';
import ProductsView from '@/user/views/ProductsView.vue';
import ProfileView from '@/user/views/ProfileView.vue';
import ProductsDetailView from '@/user/views/ProductsDetailView.vue';
import CartPage from '@/user/views/CartPage.vue'; // 👈 Import trang giỏ hàng

const UserRoutes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/Profile', name: 'ProfileView', component: ProfileView },
  { path: '/Products/', name: 'ProductsView', component: ProductsView },
  { path: '/Products/:id', name: 'ProductsDetailView', component: ProductsDetailView },
  { path: '/cart', name: 'CartPage', component: CartPage } // 👈 Route giỏ hàng
]

export default UserRoutes;
