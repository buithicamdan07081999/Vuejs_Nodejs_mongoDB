const Cart = require("../../models/Cart/CartModel");

// Thêm sản phẩm vào giỏ
exports.addToCart = async (req, res) => {
  const { productId, quantity, color, size } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Chưa có giỏ hàng, tạo mới
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, color, size }],
      });
    } else {
      // Đã có giỏ → cập nhật hoặc thêm mới sản phẩm
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex > -1) {
        // Đã có sản phẩm tương tự → tăng số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Sản phẩm mới → thêm vào mảng
        cart.items.push({ productId, quantity, color, size });
      }

      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Thêm giỏ hàng thất bại" });
  }
};
