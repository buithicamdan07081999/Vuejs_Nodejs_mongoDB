<script setup>
import { ref, onMounted, watch } from 'vue';
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
    }
    ); errors.value.variations.push('');
};
const getCleanProductData = (product, imageUrl) => {
    const cleanData = { ...product, image: imageUrl };
    delete cleanData.__v;
    delete cleanData.updatedAt;
    return cleanData;
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
        confirmButtonText: 'Cập nhật!',
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
        const cleanData = getCleanProductData(product.value, imageUrl);

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
// Thêm UI 
const isFormValid = computed(() => {
    const hasValidName = product.value.name.trim().length > 0;
    const hasValidPrice = product.value.price >= 1000;
    const hasValiddescription = product.value.description.trim().length > 0;
    const hasValidCategory = product.value.category.trim().length > 0;
    const hasValidGender = product.value.gender.trim().length > 0;
    const allVariationsValid = product.value.variations.every(variation => {
        return (
            variation.color &&
            variation.size &&
            variation.stock >= 0
        );
    });
    return hasValidGender && hasValidName && hasValidPrice && hasValiddescription && hasValidCategory && allVariationsValid;
});
const errors = ref({
    //variations sẽ là một mảng lỗi tương ứng với từng biến thể (theo index).
    name: '',
    price: '',
    category: '',
    gender: '',
    description: '',
    variations: [],
});
watch(product, (newProduct) => {
    // Reset lỗi
    errors.value.name = '';
    errors.value.price = '';
    errors.value.category = '';
    errors.value.description = '';
    errors.value.variations = [];

    if (!newProduct.name.trim()) {
        errors.value.name = 'Tên sản phẩm không được để trống.';
    }

    if (newProduct.price < 1000) {
        errors.value.price = 'Giá phải lớn hơn hoặc bằng 1.000 VNĐ.';
    }

    if (!newProduct.description.trim()) {
        errors.value.description = 'Mô tả sản phẩm không được để trống.';
    }

    if (!newProduct.category.trim()) {
        errors.value.category = 'Danh mục không được để trống.';
    }
    if (!newProduct.gender) {
        errors.value.gender = 'Vui lòng chọn giới tính.';
    }

    // Validate biến thể
    newProduct.variations.forEach((variation, index) => {
        const variationErrors = [];

        if (!variation.color) variationErrors.push('Chọn màu.');
        if (!variation.size) variationErrors.push('Chọn size.');
        if (variation.stock < 0) variationErrors.push('Tồn kho không được âm.');

        errors.value.variations[index] = variationErrors.join(' ');
    });
}, { deep: true });
</script>

<template>
    <div class="max-w-2xl mx-auto bg-blue-100 text-black p-6 rounded shadow mt-8">
        <h1 class="text-xl font-bold mb-4 text-center">Cập nhật sản phẩm</h1>
        <form @submit.prevent="updateProduct" class="space-y-4">
            <div>
                <label class="block font-medium mb-1">Tên sản phẩm</label>
                <div v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</div>
                <input v-model="product.name" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
                <label class="block font-medium mb-1">Giá (VNĐ)</label>
                <div v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price }}</div>
                <input v-model="formattedPrice" type="text" inputmode="numeric" class="w-full border rounded px-3 py-2"
                    required />
            </div>
            <div>
                <label class="block font-medium mb-1">Mô tả</label>
                <div v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</div>
                <textarea v-model="product.description" rows="4" class="w-full border rounded px-3 py-2"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-medium mb-1">Danh mục</label>
                    <div v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</div>
                    <input v-model="product.category" type="text" class="w-full border rounded px-3 py-2" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-medium mb-1">Giới tính</label>
                    <div v-if="errors.gender" class="text-red-600 text-sm mt-1">{{ errors.gender }}</div>
                    <select v-model="product.gender" class="w-full border rounded px-3 py-2">
                        <option disabled value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block font-medium mb-1">Chi tiết biến thể</label>
                <div v-for="(variation, index) in product.variations" :key="index" class="flex items-center gap-2 mb-2">
                    <div v-if="errors.variations[index]" class="text-red-600 text-sm mt-1 w-full">
                        {{ errors.variations[index] }}
                    </div>
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
                <button type="submit" :disabled="!isFormValid"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Cập nhật sản phẩm
                </button>
            </div>
        </form>
    </div>
</template>