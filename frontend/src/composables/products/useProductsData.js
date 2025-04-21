import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useProducts() {
  const products = ref([]);
  const productslast = ref([]);
  const productsprice = ref([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      products.value = res.data;
    } catch (err) {
      console.error('Lỗi fetchProducts:', err);
    }
  };

  const fetchlastestProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/latest');
      productslast.value = res.data;
    } catch (err) {
      console.error('Lỗi fetchlatest:', err);
    }
  };

  const fetchpriceProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/price');
      productsprice.value = res.data;
    } catch (err) {
      console.error('Lỗi fetchprice:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
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
