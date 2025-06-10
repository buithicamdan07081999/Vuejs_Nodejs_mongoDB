import LoginView from '@/auth/views/LoginView.vue';
import RegisterView from '@/auth/views/RegisterView.vue';
import ProfileForm from '@/auth/views/ProfileForm.vue';
import ProfileUpdateForm from '@/auth/views/ProfileUpdateForm.vue';
import ChangePasswordView from '@/auth/views/ChangePasswordView.vue';

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
  },
  {
    path: '/profile/edit',
    name: 'ProfileUpdateForm',
    component: ProfileUpdateForm
  },
  {
    path: '/profile/change/password',
    name: 'ChangePassword',
    component: ChangePasswordView
  }
];
