import { create } from "zustand";
import { createUserSlice, UserSlice } from "./user-slice";
import { immer } from "zustand/middleware/immer";
import { CartSlice, createCartSlice } from "./cart-slice";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export type Store = UserSlice & CartSlice;

export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      devtools(
        immer((...a) => ({
          ...createUserSlice(...a),
          ...createCartSlice(...a),
        }))
      )
    ),
    {
      name: "zustand-shopping-cart",
    }
  )
);
