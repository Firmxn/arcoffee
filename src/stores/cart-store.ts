// Zustand store untuk keranjang belanja
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Option } from '@/types';

interface CartState {
    items: CartItem[];

    // Actions
    addItem: (product: Product, quantity: number, selectedOptions: Option[], notes?: string) => void;
    removeItem: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;

    // Computed
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// Helper untuk menghitung subtotal item
const calculateSubtotal = (product: Product, quantity: number, selectedOptions: Option[]): number => {
    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.extraPrice, 0);
    return (product.price + optionsPrice) * quantity;
};

// Helper untuk generate unique ID
const generateId = (): string => {
    return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // Tambah item ke keranjang
            addItem: (product, quantity, selectedOptions, notes) => {
                const newItem: CartItem = {
                    id: generateId(),
                    product,
                    quantity,
                    selectedOptions,
                    notes,
                    subtotal: calculateSubtotal(product, quantity, selectedOptions),
                };

                set((state) => ({
                    items: [...state.items, newItem],
                }));
            },

            // Hapus item dari keranjang
            removeItem: (cartItemId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== cartItemId),
                }));
            },

            // Update quantity item
            updateQuantity: (cartItemId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(cartItemId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === cartItemId
                            ? {
                                ...item,
                                quantity,
                                subtotal: calculateSubtotal(item.product, quantity, item.selectedOptions),
                            }
                            : item
                    ),
                }));
            },

            // Kosongkan keranjang
            clearCart: () => {
                set({ items: [] });
            },

            // Hitung total item di keranjang
            getTotalItems: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },

            // Hitung total harga
            getTotalPrice: () => {
                return get().items.reduce((sum, item) => sum + item.subtotal, 0);
            },
        }),
        {
            name: 'arcoffee-cart', // Key untuk localStorage
        }
    )
);
