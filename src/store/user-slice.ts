import { StateCreator } from "zustand";

type UserState = {
  name: string;
  email: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  name: "",
  email: "",
  age: 0,
  address: "",

  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),

  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      name: "John Doe",
      age: 32,
      address: "",
      email: "john@doe.com",
    });
  },
});
