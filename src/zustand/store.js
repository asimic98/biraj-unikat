import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { productsData } from "../database/productsData";

export const useStore = create((set) => ({
  login: false,
  toggleLogin: () => set((state) => ({ login: !state.login })),
}));

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      totalAmount: 0,

      clearCartItems: () => {
        set({ cartItems: [] });
      },

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

      removeItemFromCart: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === itemId && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        }));
      },

      deleteItemFromCart: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));
      },

      getTotalAmount: () => {
        let total = 0;
        const { cartItems } = get();

        cartItems.forEach((item) => {
          const product = productsData.find(
            (product) => product.id === item.id
          );
          if (product) {
            total += item.quantity * product.price;
          }
        });

        // Update the totalAmount state
        set({ totalAmount: total });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
