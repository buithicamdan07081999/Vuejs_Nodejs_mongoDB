<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { computed } from 'vue';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const formattedPrice = computed({
    get() {
        return product.value.price.toLocaleString('vi-VN'); // Hiển thị: 1.000.000
    },
    set(val) {
        const numericValue = parseInt(val.replace(/\D/g, '')) || 0; // Bỏ dấu chấm, lấy số
        product.value.price = numericValue;
    }
});

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
const newImageFile = ref(null); // lưu file mới tạm thời
const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
        imagePreview.value = URL.createObjectURL(file); // hiển thị preview nhanh
        newImageFile.value = file;                      // lưu tạm ảnh mới, CHƯA upload
    }
};

onMounted(fetchProduct);

const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('oldImage', product.value.image); // gửi file ảnh cũ để xóa trong thư mục sau khi update
        console.log('file:', file, 'oldImage', product.value.image);
        const res = await axios.post('/upload', formData);
        return res.data.image;
    } catch (err) {
        console.error('Lỗi upload ảnh:', err);
        alert('Không thể upload ảnh!');
        return '';
    }
};

const addVariation = () => {
    product.value.variations.push({
        color: '',
        size: '',
        stock: 0
    });
};

// Hàm cập nhật
const updateProduct = async () => {
    // Cảnh báo xác nhận
    const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn cập nhật?',
        text: 'Ảnh sản phẩm sẽ được thay đổi!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vâng, cập nhật!',
        cancelButtonText: 'Huỷ'
    });

    if (result.isConfirmed) {
        // Chỉ upload ảnh nếu cần thiết
        let imageUrl = product.value.image; // Dùng ảnh cũ nếu không có ảnh mới
        if (imagePreview.value !== product.value.image) {
            if (newImageFile.value) {
                imageUrl = await uploadImage(newImageFile.value);
            }
        }

        // Cập nhật dữ liệu sản phẩm
        const cleanData = { ...product.value, image: imageUrl };
        delete cleanData.__v;
        delete cleanData.updatedAt;

        const url = `/products/${productId}`;
        
        try {
            await axios.put(url, cleanData);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Cập nhật thành công!',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'animate-fade-in'
                }
            });
            router.push('/admin/products');
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            Swal.fire('Cập nhật thất bại!', 'Vui lòng thử lại.', 'error');
        }
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