<template>

  <div v-if="product" class="p-4">
    <!-- 📌 Chi tiết:
    🔹 v-if="product"
    Đây là directive (chỉ thị) của Vue.js.
      Chức năng: Kiểm tra nếu product có giá trị hợp lệ, phần tử <div> sẽ được render.
      Nếu product là null, undefined, false, 0 hoặc "" (chuỗi rỗng), thì phần tử sẽ không tồn tại trong DOM. -->

    <!-- Chỉ hiển thị div nếu product tồn tại (truthy). -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Ảnh sản phẩm -->
      <div>
        <img :src="product.image" alt="Product Image" class="w-full h-80 object-cover" />
        <!-- Giúp hình ảnh bao phủ toàn bộ kích thước của phần tử mà không bị méo (cắt xén nếu cần). -->
      </div>

      <!-- Thông tin sản phẩm -->
      <div>
        <h2 class="text-2xl font-bold">{{ product.name }}</h2>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <p class="text-xl font-semibold mt-4">{{ formatPrice(product.price) }}</p>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        <!-- 
        mt-4 Margin top = 1rem (16px) (tạo khoảng cách phía trên). 
        px-4	Padding ngang = 1rem (16px) (tạo khoảng đệm trái & phải).
        py-2	Padding dọc = 0.5rem (8px) (tạo khoảng đệm trên & dưới).
        rounded	Bo tròn viền góc (mặc định là 4px).
      -->
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center">Product does not exist!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// ref: Dùng để khai báo biến reactive (biến thay đổi sẽ làm giao diện cập nhật).
// onMounted: Hook trong Vue, chạy khi component được render lần đầu tiên.
import { useRoute } from "vue-router";

const route = useRoute();

// Lấy thông tin của route hiện tại.
// Biến route có thể truy xuất các thông tin như:
// route.params → Các tham số động trong đường dẫn (ví dụ: /product/:id).
// route.query → Query parameters (ví dụ: ?color=red).
// route.path → Đường dẫn hiện tại.
// route.fullPath → Đường dẫn đầy đủ (cả query).

const product = ref(null);
// khai báo biến (khởi tạo null)
// Dùng để gán dữ liệu từ API

const products = [
  { id: 1, name: "Donut", price: 200000, description: "Áo thun chất lượng cao", image: "../../../public/images/donut.avif" },
  { id: 2, name: "Pizza", price: 1500000, description: "Áo thun chất lượng cao", image: "../../../public/images/pizza.avif" },
  { id: 3, name: "Ham", price: 500000, description: "Áo thun chất lượng cao", image: "../../../public/images/thitnguoi.avif" },
  { id: 4, name: "Egg", price: 1200000, description: "Áo thun chất lượng cao", image: "../../../public/images/egg.avif" },
];


onMounted(() => {
  const productId = parseInt(route.params.id);
  // route.params.id lấy ID của sản phẩm từ URL.
  product.value = products.find((p) => p.id === productId);
  //   Tìm kiếm sản phẩm trong danh sách products có id khớp với productId.
  //   Nếu tìm thấy, nó gán vào biến product.
  console.log("Route ID:", route.params.id, "Type:", typeof route.params.id);
  console.log("Products:", products);
  console.log("Found Product:", product.value);
});
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code" // Hiển thị mã tiền tệ "VND" thay vì "₫"
  }).format(price);
};
</script>
