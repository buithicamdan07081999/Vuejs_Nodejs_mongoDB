import MainLayout from "@/admin/views/MainLayout.vue";

export default [{
  path: "category",
  component: MainLayout,
  children: [
    {
      path: "",
      name: "Categories",
      component: () => import("@/admin/components/Categories/CategoryList.vue"),
    },
    {
      path: "add",
      name: "AddCategory",
      component: () => import("@/admin/components/Categories/AddCategory.vue"),
    },
    {
      path: "edit/:id",
      name: "EditCategory",
      component: () => import("@/admin/components/Categories/UpdateCategory.vue"),
    },
  ],
}];