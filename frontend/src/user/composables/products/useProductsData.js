import { ref, onMounted } from 'vue';
import axios from '@/axios';

export function useProducts() {
  const products = ref([]);
  const productslast = ref([]);
  const productsprice = ref([]);

  const fetchProducts = async () => {
    // console.error('Đường dẫn APIProducts:', axios.defaults.baseURL);
    try {
      const res = await axios.get('/product');
      products.value = res.data;
    } catch (err) {
      console.error('Lỗi get APIProducts:', err);
    }
  };

  const fetchlastestProducts = async () => {
    try {
      const res = await axios.get('/product/latest');
      productslast.value = res.data;
    } catch (err) {
      console.error('Lỗi fetchlatest:', err);
    }
  };

  const fetchpriceProducts = async () => {
    try {
      const res = await axios.get('/product/price');
      productsprice.value = res.data;
    } catch (err) {
      console.error('Lỗi fetchprice:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/product/${id}`);
      alert('Xóa thành công!');
      await fetchProducts();
    } catch (err) {
      console.error('Lỗi xóa sản phẩm:', err);
    }
  };

  onMounted(() => {
    fetchProducts();
    fetchlastestProducts();
    fetchpriceProducts();
  });

  return {
    products,
    productslast,
    productsprice,
    deleteProduct,
  };
}