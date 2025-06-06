import login from '@/user/views/ProductsView.vue';
import profile from '@/user/views/ProfileView.vue';
import register from '@/user/views/ProductsDetailView.vue';

const UserRoutes = [
  { path: '/login', name: 'login', component: login },
  { path: '/profile', name: 'profile', component: profile },
  { path: '/register', name: 'register', component: register },
]

export default UserRoutes;
