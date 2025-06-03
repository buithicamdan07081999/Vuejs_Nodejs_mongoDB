import MainLayout from "@/admin/views/MainLayout.vue";

export default [{
 path: "order",
  component: MainLayout,
  children: [
    {
      path: "",
      name: "orders",
      component: () => import("@/admin/components/Order/OrdersPage.vue"),
    },
  ],
}];