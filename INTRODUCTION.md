🗂 Dự án KDBD
✅ 1. Backend
mathematica
Sao chép
Chỉnh sửa
backend/
├── controllers/
│   ├── Auth/
│   │   ├── AuthController.js
│   │   └── UserController.js
│   ├── Category/
│   │   ├── createCategoryController.js
│   │   ├── deleteCategoryController.js
│   │   ├── getCategoryController.js
│   │   └── updateCategoryController.js
│   └── Product/
│       ├── createProductController.js
│       ├── deleteProductController.js
│       ├── getProductController.js
│       └── updateProductController.js
├── models/
│   ├── Auth/
│   │   └── UserModels.js
│   └── Products/
│       ├── CategoryModel.js
│       └── ProductsModels.js
├── routes/
│   ├── Auth/
│   │   ├── AuthRoutes.js
│   │   └── UserRoutes.js
│   └── Product/
│       ├── CategoryRoutes.js
│       ├── ProductRoutes.js
│       └── UploadRoutes.js
├── uploads/
├── .env
└── server.js
✅ 2. Frontend (Vue 3 + Composition API + TailwindCSS)
pgsql
Sao chép
Chỉnh sửa
frontend/
├── public/
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── Categories/
│   │   │   ├── Order/
│   │   │   ├── Pages/
│   │   │   └── Products/
│   │   ├── router/
│   │   └── views/
│   │       └── Home.vue
│   ├── assets/
│   ├── auth/
│   ├── composables/
│   │   └── products/
│   ├── format/
│   ├── i18n/
│   ├── layouts/
│   ├── locales/
│   ├── router/
│   ├── stores/
│   └── user/
│       ├── components/
│       │   ├── Account/
│       │   ├── Products/
│       │   └── Slider/
│       ├── router/
│       │   └── userRoutes.js
│       └── views/
├── api.js
├── App.vue
└── axios.js
✅ Công nghệ đang dùng
Frontend:

Vue 3 (Composition API)

TailwindCSS

Vue Router

Pinia

SweetAlert2

Backend:

Node.js

Express.js

MongoDB

JWT (Xác thực)

Bcrypt (Mã hóa mật khẩu)

✅ Chức năng đã hoàn thành:
CRUD sản phẩm, danh mục (có phân trang)

Upload hình ảnh

Toast thông báo (SweetAlert2)

API riêng biệt cho Auth, Product, Category

🔧 Đang thực hiện:
Tích hợp API Đăng ký / Đăng nhập vào Frontend

Gửi thông tin từ form lên backend

Nhận JWT token khi đăng nhập thành công

Lưu token + user info vào localStorage

Sử dụng token để gọi API protected (auth middleware)

🔐 MỤC TIÊU
Khi người dùng đăng nhập thành công:

Backend trả về accessToken + thông tin user

Frontend lưu token + user vào localStorage

Pinia lưu trạng thái đăng nhập

Các API protected sẽ tự động gửi Authorization: Bearer <token>

