import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Unique ID (productId + variants)
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variants: {
    length?: string;
    density?: string;
    capSize?: string;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = `${item.productId}-${item.variants.length}-${item.variants.density}`;
        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, { ...item, id }], isOpen: true };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'manevia-cart-storage',
    }
  )
);
