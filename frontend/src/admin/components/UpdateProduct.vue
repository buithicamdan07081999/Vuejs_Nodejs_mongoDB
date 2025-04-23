<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const product = ref({
    name: '',
    price: 0,
    description: '',
    category: '',
    size: '',
    image: '',
    stock: 0,
    gender: '',
    variations: [],
});

const formattedPrice = computed({
    get() {
        return product.value.price.toLocaleString('vi-VN');
    },
    set(val) {
        const numericValue = parseInt(val.replace(/\D/g, '')) || 0;
        product.value.price = numericValue;
    }
});

const imagePreview = ref(null);
const selectedFile = ref(null);

const fetchProduct = async () => {
    try {
        const res = await axios.get(`/products/${productId}`);
        product.value = res.data;
        imagePreview.value = res.data.image;
    } catch (err) {
        console.error('Lỗi lấy sản phẩm:', err);
    }
};

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const addVariation = () => {
    product.value.variations.push({
        color: '',
        size: '',
        stock: 0
    });
};

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
const updateProduct = async () => {
    try {
        if (selectedFile.value) {
            const formData = new FormData();
            formData.append('image', selectedFile.value);
            formData.append('oldImage', product.value.image);

            const res = await axios.post('/upload', formData);
            product.value.image = res.data.image;
        }

        const cleanData = { ...product.value };
        delete cleanData.__v;
        delete cleanData.updatedAt;

        await axios.put(`/products/${productId}`, cleanData);

        // ✅ Toast thông báo thành công
        Toast.fire({
            icon: 'success',
            title: 'Cập nhật thành công!'
        });

        router.push('/admin/products');
    } catch (err) {
        console.error('Lỗi cập nhật:', err);
        Toast.fire({
            icon: 'error',
            title: 'Lỗi khi cập nhật!'
        });
    }
};

onMounted(fetchProduct);
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
                <input v-model="formattedPrice" type="text" inputmode="numeric" class="w-full border rounded px-3 py-2"
                    required />
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
            </div>
            <div>
                <label class="block font-medium mb-1">Chi tiết biến thể</label>
                <div v-for="(variation, index) in product.variations" :key="index" class="flex items-center gap-2 mb-2">
                    <!-- Dropdown chọn màu -->
                    <select v-model="variation.color" class="border px-2 py-1 rounded w-1/3">
                        <option disabled value="">Chọn màu</option>
                        <option>Black</option>
                        <option>White</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Green</option>
                    </select>

                    <!-- Dropdown chọn size -->
                    <select v-model="variation.size" class="border px-2 py-1 rounded w-1/3">
                        <option disabled value="">Chọn size</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>

                    <!-- Nhập tồn kho -->
                    <input :value="variation.stock.toLocaleString('vi-VN')" @input="e => {
                        const val = parseInt(e.target.value.replace(/\\D/g, '')) || 0;
                        variation.stock = val;
                    }" type="text" inputmode="numeric" placeholder="Tồn kho" class="border px-2 py-1 rounded w-1/3" />

                    <!-- Xóa -->
                    <button type="button" @click="product.variations.splice(index, 1)"
                        class="text-red-600 font-bold ml-2">
                        ✕
                    </button>
                </div>

                <!-- Nút thêm -->
                <!-- Nút thêm chi tiết: chỉ hiển thị khi chưa có variation -->
                <button v-if="product.variations.length === 0" type="button" @click="addVariation"
                    class="mt-2 text-blue-700 hover:underline font-medium">
                    + Thêm Chi tiết
                </button>

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