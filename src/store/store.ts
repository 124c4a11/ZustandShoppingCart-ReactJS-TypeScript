import { create } from "zustand";
import { createUserSlice, UserSlice } from "./user-slice";
import { immer } from "zustand/middleware/immer";
import { CartSlice, createCartSlice } from "./cart-slice";

export type Store = UserSlice & CartSlice;

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createUserSlice(...a),
    ...createCartSlice(...a),
  }))
);
