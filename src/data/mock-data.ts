// Mock data untuk development ARCoffee
// Data dummy yang merepresentasikan struktur database

import { Category, Product, Option } from '@/types';

// Kategori menu
export const categories: Category[] = [
    {
        id: 'cat-1',
        name: 'Kopi',
        slug: 'kopi',
        description: 'Berbagai pilihan kopi signature kami',
        image: '/images/categories/coffee.jpg',
    },
    {
        id: 'cat-2',
        name: 'Non-Kopi',
        slug: 'non-kopi',
        description: 'Minuman segar tanpa kafein',
        image: '/images/categories/non-coffee.jpg',
    },
    {
        id: 'cat-3',
        name: 'Makanan',
        slug: 'makanan',
        description: 'Cemilan dan makanan pendamping',
        image: '/images/categories/food.jpg',
    },
];

// Opsi kustomisasi
export const options: Option[] = [
    // Size options
    { id: 'opt-size-regular', group: 'size', name: 'Regular', extraPrice: 0 },
    { id: 'opt-size-large', group: 'size', name: 'Large', extraPrice: 5000 },

    // Ice level options
    { id: 'opt-ice-no', group: 'ice', name: 'No Ice', extraPrice: 0 },
    { id: 'opt-ice-less', group: 'ice', name: 'Less Ice', extraPrice: 0 },
    { id: 'opt-ice-normal', group: 'ice', name: 'Normal Ice', extraPrice: 0 },
    { id: 'opt-ice-extra', group: 'ice', name: 'Extra Ice', extraPrice: 0 },

    // Sugar level options
    { id: 'opt-sugar-less', group: 'sugar', name: 'Less Sugar', extraPrice: 0 },
    { id: 'opt-sugar-normal', group: 'sugar', name: 'Normal Sugar', extraPrice: 0 },
    { id: 'opt-sugar-extra', group: 'sugar', name: 'Extra Sugar', extraPrice: 0 },

    // Add-on options
    { id: 'opt-addon-shot', group: 'addon', name: 'Extra Espresso Shot', extraPrice: 5000 },
    { id: 'opt-addon-whip', group: 'addon', name: 'Whipped Cream', extraPrice: 3000 },
    { id: 'opt-addon-jelly', group: 'addon', name: 'Coffee Jelly', extraPrice: 4000 },
    { id: 'opt-addon-boba', group: 'addon', name: 'Brown Sugar Boba', extraPrice: 5000 },
];

// Helper untuk mendapatkan opsi berdasarkan grup
export const getOptionsByGroup = (group: string) =>
    options.filter(opt => opt.group === group);

// Produk/menu
export const products: Product[] = [
    // Kopi
    {
        id: 'prod-1',
        name: 'Espresso',
        slug: 'espresso',
        description: 'Espresso murni dengan crema sempurna. Bold dan intens.',
        price: 18000,
        image: '/images/products/espresso.jpg',
        categoryId: 'cat-1',
        isAvailable: true,
        options: [
            { productId: 'prod-1', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-1', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-1', optionId: 'opt-addon-shot', option: options[9] },
        ],
    },
    {
        id: 'prod-2',
        name: 'Americano',
        slug: 'americano',
        description: 'Espresso dengan air panas. Rasa kopi yang smooth dan ringan.',
        price: 22000,
        image: '/images/products/americano.jpg',
        categoryId: 'cat-1',
        isAvailable: true,
        options: [
            { productId: 'prod-2', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-2', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-2', optionId: 'opt-ice-no', option: options[2] },
            { productId: 'prod-2', optionId: 'opt-ice-less', option: options[3] },
            { productId: 'prod-2', optionId: 'opt-ice-normal', option: options[4] },
            { productId: 'prod-2', optionId: 'opt-addon-shot', option: options[9] },
        ],
    },
    {
        id: 'prod-3',
        name: 'Cafe Latte',
        slug: 'cafe-latte',
        description: 'Espresso dengan steamed milk yang creamy. Favorit sepanjang masa.',
        price: 28000,
        image: '/images/products/latte.jpg',
        categoryId: 'cat-1',
        isAvailable: true,
        options: [
            { productId: 'prod-3', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-3', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-3', optionId: 'opt-ice-no', option: options[2] },
            { productId: 'prod-3', optionId: 'opt-ice-less', option: options[3] },
            { productId: 'prod-3', optionId: 'opt-ice-normal', option: options[4] },
            { productId: 'prod-3', optionId: 'opt-sugar-less', option: options[6] },
            { productId: 'prod-3', optionId: 'opt-sugar-normal', option: options[7] },
            { productId: 'prod-3', optionId: 'opt-addon-shot', option: options[9] },
            { productId: 'prod-3', optionId: 'opt-addon-whip', option: options[10] },
        ],
    },
    {
        id: 'prod-4',
        name: 'Cappuccino',
        slug: 'cappuccino',
        description: 'Espresso dengan foam susu yang tebal. Klasik Italia.',
        price: 28000,
        image: '/images/products/cappuccino.jpg',
        categoryId: 'cat-1',
        isAvailable: true,
        options: [
            { productId: 'prod-4', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-4', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-4', optionId: 'opt-sugar-less', option: options[6] },
            { productId: 'prod-4', optionId: 'opt-sugar-normal', option: options[7] },
            { productId: 'prod-4', optionId: 'opt-addon-shot', option: options[9] },
        ],
    },
    {
        id: 'prod-5',
        name: 'Caramel Macchiato',
        slug: 'caramel-macchiato',
        description: 'Latte dengan vanilla syrup dan caramel drizzle. Manis dan creamy.',
        price: 32000,
        image: '/images/products/caramel-macchiato.jpg',
        categoryId: 'cat-1',
        isAvailable: true,
        options: [
            { productId: 'prod-5', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-5', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-5', optionId: 'opt-ice-no', option: options[2] },
            { productId: 'prod-5', optionId: 'opt-ice-less', option: options[3] },
            { productId: 'prod-5', optionId: 'opt-ice-normal', option: options[4] },
            { productId: 'prod-5', optionId: 'opt-sugar-less', option: options[6] },
            { productId: 'prod-5', optionId: 'opt-sugar-normal', option: options[7] },
            { productId: 'prod-5', optionId: 'opt-sugar-extra', option: options[8] },
            { productId: 'prod-5', optionId: 'opt-addon-shot', option: options[9] },
            { productId: 'prod-5', optionId: 'opt-addon-whip', option: options[10] },
        ],
    },
    // Non-Kopi
    {
        id: 'prod-6',
        name: 'Matcha Latte',
        slug: 'matcha-latte',
        description: 'Green tea premium dengan susu. Earthy dan creamy.',
        price: 30000,
        image: '/images/products/matcha-latte.jpg',
        categoryId: 'cat-2',
        isAvailable: true,
        options: [
            { productId: 'prod-6', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-6', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-6', optionId: 'opt-ice-no', option: options[2] },
            { productId: 'prod-6', optionId: 'opt-ice-less', option: options[3] },
            { productId: 'prod-6', optionId: 'opt-ice-normal', option: options[4] },
            { productId: 'prod-6', optionId: 'opt-sugar-less', option: options[6] },
            { productId: 'prod-6', optionId: 'opt-sugar-normal', option: options[7] },
            { productId: 'prod-6', optionId: 'opt-addon-boba', option: options[12] },
        ],
    },
    {
        id: 'prod-7',
        name: 'Chocolate',
        slug: 'chocolate',
        description: 'Cokelat premium dengan susu. Manis dan comforting.',
        price: 26000,
        image: '/images/products/chocolate.jpg',
        categoryId: 'cat-2',
        isAvailable: true,
        options: [
            { productId: 'prod-7', optionId: 'opt-size-regular', option: options[0] },
            { productId: 'prod-7', optionId: 'opt-size-large', option: options[1] },
            { productId: 'prod-7', optionId: 'opt-ice-no', option: options[2] },
            { productId: 'prod-7', optionId: 'opt-ice-normal', option: options[4] },
            { productId: 'prod-7', optionId: 'opt-sugar-less', option: options[6] },
            { productId: 'prod-7', optionId: 'opt-sugar-normal', option: options[7] },
            { productId: 'prod-7', optionId: 'opt-addon-whip', option: options[10] },
        ],
    },
    // Makanan
    {
        id: 'prod-8',
        name: 'Croissant',
        slug: 'croissant',
        description: 'Pastry butter berlapis-lapis. Renyah di luar, lembut di dalam.',
        price: 25000,
        image: '/images/products/croissant.jpg',
        categoryId: 'cat-3',
        isAvailable: true,
        options: [],
    },
    {
        id: 'prod-9',
        name: 'Banana Bread',
        slug: 'banana-bread',
        description: 'Roti pisang homemade dengan walnut. Moist dan flavorful.',
        price: 22000,
        image: '/images/products/banana-bread.jpg',
        categoryId: 'cat-3',
        isAvailable: true,
        options: [],
    },
    {
        id: 'prod-10',
        name: 'Cookies',
        slug: 'cookies',
        description: 'Chocolate chip cookies fresh from oven. Chewy dan gooey.',
        price: 15000,
        image: '/images/products/cookies.jpg',
        categoryId: 'cat-3',
        isAvailable: true,
        options: [],
    },
];

// Helper untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = (categoryId: string) =>
    products.filter(prod => prod.categoryId === categoryId);

// Helper untuk mendapatkan produk berdasarkan slug
export const getProductBySlug = (slug: string) =>
    products.find(prod => prod.slug === slug);

// Helper untuk mendapatkan kategori berdasarkan slug
export const getCategoryBySlug = (slug: string) =>
    categories.find(cat => cat.slug === slug);

// Helper untuk format harga ke Rupiah
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};
