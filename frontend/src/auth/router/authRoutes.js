import LoginView from '@/auth/views/LoginView.vue';
import RegisterView from '@/auth/views/RegisterView.vue';
import ProfileForm from '@/auth/views/ProfileForm.vue';

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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileForm
  }
];