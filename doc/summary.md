Rangkuman lengkap rencana pengembangan aplikasi web *coffeeshop* Anda dengan nama ARCoffee. Dokumen ini dirancang agar siap digunakan sebagai panduan (SOP) bagi Anda maupun sebagai instruksi konteks untuk AI Agent nantinya.

---

# Rangkuman Rencana Pengembangan Web App ARCoffee

### 1. Arsitektur & Tech Stack

* **Front-End:** Next.js (React) + Tailwind CSS.
* **Back-End & Database:** Supabase (PostgreSQL).
* **Arsitektur:** *Headless API First* (Memisahkan Front-end dan Back-end agar nantinya bisa digunakan oleh aplikasi Android/iOS tanpa migrasi besar).
* **Metode Otentikasi:** Supabase Auth (JWT berbasis token).

#### Library Tambahan:

| Kebutuhan | Library |
|-----------|---------|
| Keranjang Belanja | `zustand` |
| Komponen UI | `shadcn/ui` |
| Ikon | `lucide-react` |
| Validasi Form | `react-hook-form` + `zod` |
| Fetching Data | `@tanstack/react-query` |
| Notifikasi Popup | `sonner` |

### 2. Struktur Database (Skema PostgreSQL)

Sistem dirancang fleksibel untuk kustomisasi menu:

* **Master Data:**
* `categories`: Mengelompokkan menu (Kopi, Non-Kopi, Makanan).
* `products`: Daftar menu utama dan harga dasar.
* `options`: Master pilihan kustomisasi (Grup: Size, Sugar, Ice, Topping, Add-on) beserta harga tambahan (`extra_price`).


* **Relasi & Transaksi:**
* `product_options`: Menentukan opsi apa saja yang tersedia untuk tiap produk tertentu.
* `orders`: Data utama pesanan, total harga, dan status pembayaran.
* `order_items`: Daftar produk yang dibeli dalam satu pesanan.
* `order_item_options`: Catatan pilihan kustomisasi spesifik yang dipilih pelanggan untuk tiap item (misal: "Less Ice" atau "Extra Shot").



### 3. Fitur Kustomisasi Menu (Pilihan Bebas)

Aplikasi mendukung kustomisasi mendalam bagi pengguna:

* **Ice Level:** No Ice, Less Ice, Normal, Extra Ice.
* **Sugar Level:** Less Sugar, Normal, Extra Sugar.
* **Size:** Regular, Large.
* **Add-ons & Toppings:** Extra Espresso Shot, Jelly, Whipped Cream, dll.

### 4. Sistem Pembayaran & Operasional

* **Tahap Awal (Dummy):** Menggunakan status manual di database untuk simulasi pembayaran berhasil guna mempercepat pengembangan alur (flow).
* **Tahap Lanjut:** Integrasi Midtrans (Payment Gateway) menggunakan *Edge Functions* Supabase untuk menangani *webhook* status pembayaran secara otomatis.
* **Real-time Admin:** Dasbor Barista menggunakan fitur *Supabase Realtime* untuk menerima notifikasi pesanan masuk secara instan tanpa perlu refresh halaman.

### 5. Strategi Masa Depan (Mobile)

Aplikasi mobile (Android/iOS) akan dikembangkan menggunakan **React Native** atau **Flutter** dengan memanfaatkan API yang sama yang sudah dibangun di Supabase, sehingga data pelanggan dan menu tetap sinkron.

---