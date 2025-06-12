✅ TÓM TẮT DỰ ÁN BÁN HÀNG (Vue 3 + TailwindCSS + Node.js + MongoDB)
🔧 Công nghệ sử dụng:
Frontend: Vue 3 (Composition API), TailwindCSS, Pinia, Vue Router

Backend: Node.js + Express

Database: MongoDB

Xác thực: JWT (JSON Web Token)

Thông báo: SweetAlert2

✅ Chức năng đã hoàn thành:
 Đăng ký / đăng nhập (JWT)

 Xem thông tin người dùng (trang /profile)

 Cập nhật thông tin cá nhân

 Đổi mật khẩu cho user

 Đổi mật khẩu cho user từ phía admin

 Quản lý người dùng từ admin: tạo, sửa, phân quyền

 CRUD sản phẩm, danh mục

 Phân trang, tìm kiếm, lọc sản phẩm

✅ Chức năng sắp làm (theo yêu cầu hiện tại):
🛒 1. Trang chi tiết sản phẩm
Hiển thị thông tin chi tiết của 1 sản phẩm

Có nút: Thêm vào giỏ hàng và Mua ngay

🧩 2. Chức năng giỏ hàng
Khi bấm Thêm vào giỏ hàng:

Tạo bản ghi giỏ hàng (Cart) trong DB hoặc cập nhật lại nếu đã tồn tại.

Gắn theo _id của user đang đăng nhập (phân biệt khách A / B).

Có thể thêm 1 field như isInCart: true để giúp hiển thị nhanh.

Khi bấm Mua ngay:

Chuyển sang trang điền thông tin nhận hàng → Tạo đơn hàng (Order)

Nếu chưa đăng nhập thì yêu cầu đăng nhập hoặc đăng ký.

🔎 3. Quản lý giỏ hàng
Xem danh sách sản phẩm đã thêm

Xóa sản phẩm khỏi giỏ

Sửa số lượng

Đặt hàng từ giỏ hàng