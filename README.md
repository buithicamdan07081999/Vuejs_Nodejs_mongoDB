Account MongoDB btcdan789/7892388

Các bước : 
Tạo: Tạo kết nối -> tạo fule model -> tạo fule router
🔹 Tạo file models để thiết kế database sản phẩm.
🔹 Tạo file routes để định nghĩa API.
🔹 Viết API CRUD cho products.

- Run: node server.js kết nối DB, Router, Model

Thursday, March 6, 2025

I. Cài đặt MONGODB : https://cloud.mongodb.com/
npm install express mongoose dotenv cors multer jsonwebtoken bcryptjs
🔹 express: Framework backend
🔹 mongoose: Kết nối MongoDB
🔹 dotenv: Đọc biến môi trường
🔹 cors: Cho phép frontend giao tiếp với backend
🔹 multer: Xử lý upload file
🔹 jsonwebtoken: Xác thực bằng JWT
🔹 bcryptjs: Mã hóa mật khẩu
- Tự động Load server: npm install --save-dev nodemon
- Thêm vào package.json: 
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Cài đặt : npm install mongodb
- Thêm vào thư mục .env
MONGO_URI=mongodb+srv://btcdan789:7892388@Btcd@kdbd.zvwls.mongodb.net/?retryWrites=true&w=majority&appName=KDBD 

link: https://cloud.mongodb.com/v2/67c9168ec4b1601af7c33396#/metrics/replicaSet/67c918b47f1c686bd2b4540b/explorer/sample_mflix
- Thao tác với MongoDB 
 🔹 Bước 1: Đăng nhập MongoDB Atlas
Truy cập MongoDB Atlas
Đăng nhập vào tài khoản của bạn
🔹 Bước 2: Xem danh sách Database
Chọn dự án (Project) của bạn
Trong tab Databases, bạn sẽ thấy danh sách các Cluster
Nhấn vào "Browse Collections" để xem các database và collection bên trong
🔹 Bước 3: Kiểm tra Collection và Dữ liệu
Trong phần Browse Collections, bạn sẽ thấy danh sách các Database và Collection.
Nhấp vào một Collection để xem dữ liệu bên trong.
- Chạy lệnh: node server.js
- Truy cập trình duyệt: http://localhost:5000/
=>  MongoDB đã kết nối thành công!
- chạy thử API: kiểm tra lại các files:
 + server.js
 + routes/productRoutes.js
 + models/productModel.js

Kiểm tra lại API
- node server.js
- http://localhost:5000/api/products

BACKEND
1. Khởi tạo Nodejs :
    mkdir backend && cd backend
    npm init -y
2. Cài Package
    npm install express mongoose dotenv cors body-parser morgan jsonwebtoken bcryptjs multer
3. Cài nodemon: npm install --save-dev nodemon
4. Tạo cấu trúc thư mục:
    - Backend:  
    mkdir config models routes controllers middleware uploads
5. Tạo file .env:
    touch server.js .env (sai)
    echo "" > server.js
    echo "" > .env
6. Thêm các file .env config/db.js , cd .. server.js , thêm vào file package.json 
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
7. Chạy npm run dev

II. Thao tác với Postman: 
<!-- Format https://jsonformatter.curiousconcept.com/# -->
https://solar-comet-219090.postman.co/workspace/My-Workspace~80d81272-e467-4c22-89e0-433ef940fb50/request/create?requestId=a583b040-9707-4e6c-a4a0-3cc8415907a2
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
=> Tiếp tục tạo các productModel.js, routes/productRoutes.js tương tự cho 
Tạo nhiều file trong thư mục models/, ví dụ:
User.js (người dùng)
Product.js (sản phẩm)
Order.js (đơn hàng)
Cart.js (giỏ hàng)
Payment.js (thanh toán)

Friday, March 7, 2025
FRONTEND 
1. Khởi tạo thư mục frontend :
tại thư mục frontend
npm create vue@latest frontend -> làm theo hướng dẫn 
cd frontend
npm install
npm run format
npm run dev (node backend/server.js)
2. Cài TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p (lỗi)
- khắc phục lỗi:

Saturday, March 8, 2025
download (nvm-setup.exe) + xóa nodejs 
- Cài lại: nvm và Nodejs
*** Cài nvm
1. Mở Environment Variables và xóa cacs Path cũ
2. Vào link tải nvm và cài đặt
https://github.com/coreybutler/nvm-windows/releases
3. Cài đặt (Cont): Chọn các thư mục như bên dưới
C:\nvm4w\
C:\nvm4w\nodejs\
4. Set Path tương ứng với đường dẫn trên 
5. Kiểm tra: nvm version (done)
*** Cài Nodejs
1. Cài đặt
nvm list available
nvm install 20.11.1
nvm use 20.11.1
2. Kiểm tra: 
node -v
npm -v
3. Tiếp tục ở Shell: gõ ls C:\Users\$env:USERNAME để đi vào thư mục dự án
*** Cài TailwinCSS
1. cd frontend
2. npm init -y
3. npm install -D tailwindcss postcss autoprefixer
4. tạo file cấu hình Tailwind