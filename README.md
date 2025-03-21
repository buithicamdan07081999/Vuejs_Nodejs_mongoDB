Account MongoDB btcdan789/7892388Btcd

Friday, March 21, 2025
link: 
1. https://cloud.mongodb.com
2. C:\Users\$env:USERNAME để đi vào thư mục dự án
3. https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?pli=1
 


Thursday, March 6, 2025
I.MONGODB : https://cloud.mongodb.com/
💡 Cai dat va giải thích từng package: 
  1. npm install express mongoose mongodb dotenv cors multer jsonwebtoken bcryptjs morgan
  2. npm install --save-dev nodemon (Tự động Load server)
     - Thêm vào package.json: 
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
  3. Tạo file .env: echo "" > .env
    Set up env: 
    PORT=5000
    MONGO_URI=mongodb+srv://btcdan789:7892388Btcd@kdbd.zvwls.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=4dX@
  4. Test 
     1. Truy cập trình duyệt: http://localhost:5000/
     2. Chạy thử API: kiểm tra lại các files: node server.js
  5. Chạy npm run dev

II. Thao tác với Postman: 
- Nhấn + (Chọn GET/POST):
 + GET: (Select)
  VD1: postman-echo.com/get
  VD2: http://localhost:5000/api/products (sussecfully)
 + POST (Insert)Thêm sản phẩm mới (POST)
URL: http://localhost:5000/api/products
Body (JSON - chọn "raw" + "JSON"):
{
    "prod_name": "Đầm nữ Sexy Ntree",
    "prod_price": 150000
}

[
    {
        "_id": "67c96525460e41ab7912b816",
        "prod_name": "Đầm nữ Sexy Ntree",
        "prod_price": 150000,
        "__v": 0
    }
]

LƯU Ý: tên đặt khi sd POST phải trùng với tên trong các files:
productModel.js, routes/productRoutes.js
=> Tiếp tục tạo các productModel.js, routes/productRoutes.js

*** Cài Nodejs
1. Cài đặt
nvm list available
nvm install 20.11.1
nvm use 20.11.1
1. Kiểm tra: 
node -v v20.11.1    
npm -v  10.2.4

-Tạo file api.js
 a. Mở file server.js trong thư mục backend


Friday, March 7, 2025
FRONTEND 
1.download (nvm-setup.exe) + xóa nodejs
*** Cài nvm
   1. Mở Environment Variables và xóa cacs Path cũ
   2. Vào link tải nvm và cài đặt
   https://github.com/coreybutler/nvm-windows/releases
   3. Cài đặt (Cont): Chọn các thư mục như bên dưới
   C:\nvm4w\
   C:\nvm4w\nodejs\
   4. Set Path tương ứng với đường dẫn trên
   5. Kiểm tra: nvm version (done)
    
2. Khởi tạo thư mục frontend :
npm create vue@latest frontend
npm install
npm run format
npm run dev (node backend/server.js)
3. Cài TailwindCSS
    1. npm install -D tailwindcss postcss autoprefixer
    2. npx tailwindcss init -p 
    3. cd frontend
    4. npm init -y
    5. npm install -D tailwindcss postcss autoprefixer (lỗi)
    6. https://github.com/tailwindlabs/tailwindcss/discussions/15820 (đường dẫn sửa lỗi)
    7. $ npm install -D tailwindcss@3 postcss autoprefixer (fix)
    8. tạo file cấu hình Tailwind:
        1. Tạo file tailwind.config.js
        2. Tạo file src/main.js / Nội dung: import './style.css';
        3. Kết nối Frontend và Backend
    9. Cài đặt Vue Router
        a. npm install vue-router@4
    10. Tạo cấu trúc thư mục
        a. Tạo src/router/index.js
        b. Tạo layout
    
    /frontend
 ├── /public (pics)
 ├── /src (code customize)
 │   ├── /components (Chứa các component nhỏ dùng lại được)
 │   │   ├── AppHeader.vue
 │   │   ├── AppFooter.vue
 │   │   ├── AppSidebar.vue
 │   ├── /views
 │   │   ├── HomeView.vue (ok) - index
 │   │   ├── ProductsView.vue (ok) - Trang san pham
 │   │   ├── ProductsDetailView.vue (ok) - Trang chi tiet san pham
 │   ├── /router
 │   │   ├── index.js - định nghĩa đường dẫn đến từng trang.
 │   ├── App.vue (bố cục của trang chủ)
 │   ├── main.js
 ├── package.json
 ├── vite.config.js

1. Tùy chỉnh nội dung của các thư mục:
        *** (Cập nhật App.vue để chứa Header, Sidebar, Footer)
         - src/App.vue 
         - src/components/AppHeader.vue
         - src/components/AppSidebar.vue
         - src/components/AppFooter.vue
        *** Sua main.js

2. Tao trang giao dien
   1.  Tải ảnh: https://unsplash.com/t/food-drink
   2.  frontend/src/views/HomeView.vue (sua duong dan ten anh trong homeview)
3. Sua loi giao dien:
   1. File main.css: 
    #app {
    /* cách này chia giao diện thành 2 cột bằng nhau */
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem; */ 
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ---- Giai doan 2: (sau khi tao layout thanh cong)
    1. Thiet ke giao dien trang san pham
       1. Tao trang src/views/ProductsView.vue
       2. Cap nhat Router router/index.js


📅 10/3: Thiết kế trang danh sách sản phẩm
Tiep tuc trang Chi tiet san pham
1. Cau truc du an
    src/
    ├── components/
    │   ├── products/
    │   │   ├── ProductItem.vue   // khung cua từng sản phẩm 
    │   │   ├── ProductList.vue   // Component danh sách sản phẩm
    │   │   ├── ProductFilter.vue // Component bộ lọc
    ├── views/
    │   ├── ProductListView.vue   // Trang danh sách sản phẩm
    │   ├── ProductDetailView.vue // Trang chi tiết sản phẩm
    ├── router/
    │   ├── index.js              // File cấu hình route

    1. Tạo file: src/views/ProductListView.vue (Tao giao dien)
    2. src/components/products/ProductItem.vue ( Tạo component sản phẩm)
    3. Tạo file: src/components/products/ProductFilter.vue
    4. Tạo file: src/views/ProductDetailView.vue
    5. Cập nhật file: src/router/index.js
      
2. Chay App.vue trc
3. <RouterView /> se goi cac router tuong ung (theo duong dan) (routers/index.js)
4. Banner tự động chuyển động (Carousel)
- npm install swiper
- Tai cong cu Debug: https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?pli=1