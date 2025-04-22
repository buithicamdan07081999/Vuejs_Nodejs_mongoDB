<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const productId = route.params.id;

const product = ref({
    name: '',
    price: 0,
    description: '',
    category: '',
    size: '',
    image: '', // URL hoặc base64
});

const imagePreview = ref(null); // để hiển thị preview

// Lấy sản phẩm cũ để hiển thị lên form
const fetchProduct = async () => {
    try {
        const res = await axios.get(`/products/${productId}`);
        product.value = res.data;
        imagePreview.value = res.data.image;
    } catch (err) {
        console.error('Lỗi lấy sản phẩm:', err);
    }
};

// Chọn ảnh từ máy => preview & lưu base64
const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imagePreview.value = reader.result;
            product.value.image = reader.result; // base64 ảnh
        };
        reader.readAsDataURL(file);
    }
};

onMounted(fetchProduct);

// Hàm cập nhật
const updateProduct = async () => {
    console.log('Dữ liệu chuẩn bị gửi:<br/>', JSON.stringify(product.value, null, 2));
      try {
        await axios.put(`/products/${productId}`, product.value);
        alert('Cập nhật thành công!');
        router.push('/admin/products');
      } catch (err) {
        console.error('Lỗi cập nhật:', err);
        alert('Cập nhật thất bại!');
      }
};

</script>

<template>
    <div class="max-w-2xl mx-auto bg-blue-100 text-black p-6 rounded shadow mt-8">
        <h1 class="text-xl font-bold mb-4 text-center">Cập nhật sản phẩm</h1>

        <form @submit.prevent="updateProduct" class="space-y-4">
            <div>
                <label class="block font-medium mb-1">Tên sản phẩm</label>
                <input v-model="product.name" type="text" class="w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label class="block font-medium mb-1">Giá (VNĐ)</label>
                <input v-model="product.price" type="number" class="w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label class="block font-medium mb-1">Mô tả</label>
                <textarea v-model="product.description" rows="4" class="w-full border rounded px-3 py-2"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-medium mb-1">Danh mục</label>
                    <input v-model="product.category" type="text" class="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label class="block font-medium mb-1">Kích thước</label>
                    <input v-model="product.size" type="text" class="w-full border rounded px-3 py-2" />
                </div>
            </div>

            <div>
                <label class="block font-medium mb-1">Chọn hình ảnh</label>
                <input type="file" accept="image/*" @change="handleImageUpload" class="mb-2" />
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Preview" class="w-48 h-auto rounded shadow" />
                </div>
            </div>

            <div class="flex justify-center mt-6">
                <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition">
                    Cập nhật sản phẩm
                </button>
            </div>
        </form>
    </div>
</template>