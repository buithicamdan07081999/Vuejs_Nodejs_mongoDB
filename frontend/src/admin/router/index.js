import MainLayout from "@/admin/views/MainLayout.vue";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import orderRoutes from "./orderRoutes";
export default [
  {
    path: "/admin",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: () => import("@/admin/components/Pages/Dashboard.vue"),
      },
      ...userRoutes, // cấu trúc của mảng
      ...productRoutes,
      ...categoryRoutes,
      ...orderRoutes,
    ],
  }
];