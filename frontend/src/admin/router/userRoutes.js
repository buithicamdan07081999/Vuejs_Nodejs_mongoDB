import MainLayout from "@/admin/views/MainLayout.vue";

export default 
[
  {
  path: "user",
  component: MainLayout,
  children: [
    {
      path: "",
      name: "UsersList",
      component: () => import("@/admin/components/Auth/UserList.vue"),
    },
    {
      path: "add",
      name: "AddUser",
      component: () => import("@/admin/components/Auth/AddUser.vue"),
    },
    {
      path: "reset-password/:id",
      name: "ResetPassword",
      component: () => import("@/admin/components/Auth/ForgotPassword.vue"),
    },
    {
      path: "profile/:id",
      name: "UserProfile",
      component: () => import("@/admin/components/Auth/UserList.vue"),
    },
    {
      path: "get/:id",
      name: "GetUser",
      component: () => import("@/admin/components/Auth/UserList.vue"),
    },
    {
      path: "update/:id",
      name: "UpdateUser",
      component: () => import("@/admin/components/Auth/UpdateUser.vue"),
    },
  ],
}
];