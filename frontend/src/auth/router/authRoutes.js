import LoginView from '@/auth/views/LoginView.vue';
import RegisterView from '@/auth/views/RegisterView.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  }
];