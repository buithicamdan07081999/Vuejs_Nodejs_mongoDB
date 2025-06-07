import MainLayout from "@/admin/views/MainLayout.vue";

export default [{
  path: "product",
  component: MainLayout,
  children: [
    {
      path: "",
      name: "Product",
      component: () => import("@/admin/components/Products/ProductList.vue"),
    },
    {
      path: "add",
      name: "AddProduct",
      component: () => import("@/admin/components/Products/AddProduct.vue"),
    },
    {
      path: "edit/:id",
      name: "EditProduct",
      component: () => import("@/admin/components/Products/UpdateProduct.vue"),
    },
  ],
}];