import { CartProduct } from "@/types/cartProduct";
import { Product } from "@/types/product";
import { StateCreator } from "zustand";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  getProduct: (productId: Product["id"]) => CartProduct | undefined;
  removeProduct: (productId: Product["id"]) => void;
  incrementQty: (productId: Product["id"]) => void;
  decrementQty: (productId: Product["id"]) => void;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,

  incrementQty: (productId) =>
    set(({ products }) => {
      const foundProduct = products.find(({ id }) => id === productId);

      if (foundProduct) foundProduct.qty += 1;
    }),

  decrementQty: (productId) =>
    set(({ products }) => {
      const foundIndex = products.findIndex(({ id }) => id === productId);

      if (foundIndex == -1) return;

      if (products[foundIndex].qty === 1) {
        products.splice(foundIndex, 1);
      } else {
        products[foundIndex].qty -= 1;
      }
    }),

  addProduct: (product) =>
    set(({ products }) => {
      products.push({ ...product, qty: 1 });
    }),

  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(({ id }) => id !== productId);
    }),

  getProduct: (productId) => get().products.find(({ id }) => id === productId),

  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),

  reset: () => set(() => initialState),
});
