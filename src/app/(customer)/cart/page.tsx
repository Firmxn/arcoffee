"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/data/mock-data";

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Menu
                    </Link>
                    <h1 className="font-heading text-3xl font-bold md:text-4xl">
                        Keranjang Belanja
                    </h1>
                </div>

                {items.length === 0 ? (
                    /* Empty Cart State */
                    <div className="py-20 text-center">
                        <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground/30" />
                        <h3 className="mt-6 font-heading text-xl font-semibold">
                            Keranjang kosong
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Belum ada item di keranjang. Yuk, pilih menu favoritmu!
                        </p>
                        <Link href="/menu" className="mt-6 inline-block">
                            <Button className="gap-2">
                                Lihat Menu
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 rounded-xl border border-border bg-card p-4"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                        <ShoppingBag className="h-8 w-8 text-primary/30" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-heading font-semibold">
                                                    {item.product.name}
                                                </h3>
                                                {/* Selected Options */}
                                                {item.selectedOptions.length > 0 && (
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {item.selectedOptions.map((opt) => opt.name).join(", ")}
                                                    </p>
                                                )}
                                                {item.notes && (
                                                    <p className="mt-1 text-sm text-muted-foreground italic">
                                                        Catatan: {item.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            {/* Subtotal */}
                                            <p className="font-bold text-primary">
                                                {formatPrice(item.subtotal)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart Button */}
                            <div className="pt-4">
                                <Button variant="outline" className="text-destructive" onClick={clearCart}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Kosongkan Keranjang
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                                <h3 className="font-heading text-lg font-semibold">
                                    Ringkasan Pesanan
                                </h3>

                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Biaya Layanan</span>
                                        <span>{formatPrice(0)}</span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">{formatPrice(totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout" className="mt-6 block">
                                    <Button className="w-full" size="lg">
                                        Lanjut ke Pembayaran
                                    </Button>
                                </Link>

                                <p className="mt-4 text-center text-xs text-muted-foreground">
                                    Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
