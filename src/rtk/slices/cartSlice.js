import { createSlice } from "@reduxjs/toolkit";

const num = (v) => (v == null ? 0 : parseFloat(v) || 0);

const computeStock = (item) => {
  if (typeof item.stock === "number") return item.stock;
  const stockStatus = item.stock_status;
  return stockStatus === "Out Of Stock" ? 0 : parseInt(stockStatus, 10) || 0;
};

const normalizeItem = (item) => ({
  ...item,
  // ✅ Normalize Supabase image/url fields
  img1: item.img1 || item.img1_url || item.img || null,
  img2: item.img2 || item.img2_url || null,
  img3: item.img3 || item.img3_url || null,

  // ✅ Normalize price fields
  price: num(item.price),
  discountPrice:
    item.discountPrice != null
      ? num(item.discountPrice)
      : item.discount_price != null
      ? num(item.discount_price)
      : null,

  // ✅ Normalize stock
  stock: computeStock(item),

  // ✅ Ensure color fields exist
  color1: item.color1 || null,
  color2: item.color2 || null,
  color3: item.color3 || null,
  selectedColor: item.selectedColor || item.color1 || null, // ✅ Store selected color
});

const applyTotals = (state) => {
  const { total, quantity } = state.cartItems.reduce(
    (acc, it) => {
      const priceToUse =
        it.discountPrice != null
          ? num(it.discountPrice)
          : it.discount_price != null
          ? num(it.discount_price)
          : num(it.price);

      acc.total += priceToUse * (it.quantity || 0);
      acc.quantity += it.quantity || 0;
      return acc;
    },
    { total: 0, quantity: 0 },
  );

  state.cartTotalAmount = total + 15;
  state.cartTotalQuantity = quantity;
};

// ✅ Utility: get key per user
const getCartKey = (userId) => `cartItems_${userId || "guest"}`;

// ✅ Save cart for specific user
const save = (userId, items) => {
  localStorage.setItem(getCartKey(userId), JSON.stringify(items));
};

// ✅ Load cart for specific user
const load = (userId) => {
  const saved = localStorage.getItem(getCartKey(userId));
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  userId: null, // will be set after login
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  isCartModalOpen: false, // ✅ Added cart modal state
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Set the current user id (and load their cart)
    setUserId: (state, action) => {
      state.userId = action.payload || "guest";
      state.cartItems = load(state.userId).map(normalizeItem);
      applyTotals(state);
    },

    // ✅ UPDATED: Add to cart with color support
    addToCart: (state, action) => {
      const incoming = normalizeItem({
        ...action.payload.product,
        selectedColor:
          action.payload.selectedColor || action.payload.product.color1, // ✅ Store selected color or default to color1
      });

      // Check if same product with same color already exists
      const existing = state.cartItems.find(
        (ci) =>
          ci.id === incoming.id && ci.selectedColor === incoming.selectedColor,
      );

      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity += 1;
        }
      } else {
        state.cartItems.push({ ...incoming, quantity: 1 });
      }

      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    increaseAmount: (state, action) => {
      const idx = state.cartItems.findIndex(
        (it) =>
          it.id === action.payload.id &&
          it.selectedColor === action.payload.selectedColor,
      );
      if (idx >= 0) {
        const item = state.cartItems[idx];
        const max =
          typeof item.stock === "number" ? item.stock : computeStock(item);
        if (item.quantity < max) item.quantity += 1;
      }
      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    decreaseAmount: (state, action) => {
      const idx = state.cartItems.findIndex(
        (it) =>
          it.id === action.payload.id &&
          it.selectedColor === action.payload.selectedColor,
      );
      if (idx >= 0) {
        const item = state.cartItems[idx];
        if (item.quantity > 1) item.quantity -= 1;
      }
      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (it) =>
          !(
            it.id === action.payload.id &&
            it.selectedColor === action.payload.selectedColor
          ),
      );
      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      localStorage.removeItem(getCartKey(state.userId));
    },

    setGetTotals: (state) => {
      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload.map(normalizeItem);
      applyTotals(state);
      save(state.userId, state.cartItems);
    },

    // ✅ Cart Modal Reducers
    openCartModal: (state) => {
      state.isCartModalOpen = true;
    },

    closeCartModal: (state) => {
      state.isCartModalOpen = false;
    },

    toggleCartModal: (state) => {
      state.isCartModalOpen = !state.isCartModalOpen;
    },
  },
});

export const {
  setUserId,
  addToCart,
  increaseAmount,
  decreaseAmount,
  deleteItem,
  clearCart,
  setGetTotals,
  setCartItems,
  openCartModal,
  closeCartModal,
  toggleCartModal,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;
export const selectIsCartModalOpen = (state) => state.cart.isCartModalOpen;

export default cartSlice.reducer;
