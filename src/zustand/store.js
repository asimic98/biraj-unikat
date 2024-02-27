import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create((set) => ({
  login: false,
  toggleLogin: () => set((state) => ({ login: !state.login })),
}));

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      totalAmount: 0,

      addItemToCart: (item) => {
        const cartItems = get().cartItems;
        const existingItem = cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem && existingItem.quantity > 0) {
          set((state) => ({
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [
              ...state.cartItems.filter((cartItem) => cartItem.id !== item.id),
              { ...item, quantity: 1 },
            ],
          }));
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
