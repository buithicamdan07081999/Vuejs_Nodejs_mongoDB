import HomeView from '@/user/views/HomeView.vue';
import ProductsView from '@/user/views/ProductsView.vue';
import ProfileView from '@/user/views/ProfileView.vue';
import ProductsDetailView from '@/user/views/ProductsDetailView.vue';
import CartPage from '@/user/components/Cart/CartPage.vue';
import CheckoutPage from '@/user/components/Cart/CheckoutPage.vue';
import BestPrice from '@/user/components/Products/BestPriceProducts.vue';
import NewArrivalProducts from '@/user/components/Products/NewArrivalProducts.vue';

const UserRoutes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/profile', name: 'ProfileView', component: ProfileView },
  { path: '/product', name: 'ProductsView', component: ProductsView },
  { path: '/product/:id', name: 'ProductsDetailView', component: ProductsDetailView },
  { path: '/product/bestprice', name: 'bestprice', component: BestPrice },
  { path: '/product/newest', name: 'NewArrivalProducts', component: NewArrivalProducts },
  { path: '/cart', name: 'CartPage', component: CartPage } ,
  { path: '/checkout', name: 'CheckoutPage', component: CheckoutPage }
]

export default UserRoutes;
