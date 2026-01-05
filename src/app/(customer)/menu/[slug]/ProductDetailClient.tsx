"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Coffee, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    products,
    options,
    formatPrice,
    getProductBySlug,
    getOptionsByGroup
} from "@/data/mock-data";
import { useCartStore } from "@/stores/cart-store";
import { Option, OptionGroup } from "@/types";
import { toast } from "sonner";

// Mapping group ke label
const groupLabels: Record<OptionGroup, string> = {
    size: "Ukuran",
    ice: "Level Es",
    sugar: "Level Gula",
    addon: "Tambahan",
};

interface ProductDetailClientProps {
    slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
    const router = useRouter();
    const product = getProductBySlug(slug);
    const addItem = useCartStore((state) => state.addItem);

    // State untuk kustomisasi
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [notes, setNotes] = useState("");

    // Jika produk tidak ditemukan
    if (!product) {
        return (
            <div className="py-20 text-center">
                <Coffee className="mx-auto h-16 w-16 text-muted-foreground/30" />
                <h3 className="mt-4 font-heading text-xl font-semibold">
                    Produk tidak ditemukan
                </h3>
                <Link href="/menu" className="mt-4 inline-block">
                    <Button>Kembali ke Menu</Button>
                </Link>
            </div>
        );
    }

    // Grup opsi yang tersedia untuk produk ini
    const availableGroups = [...new Set(product.options.map((po) => po.option.group))];

    // Ambil opsi berdasarkan grup dari produk
    const getProductOptionsByGroup = (group: OptionGroup) => {
        return product.options
            .filter((po) => po.option.group === group)
            .map((po) => po.option);
    };

    // Handle pilih opsi
    const handleSelectOption = (option: Option, isMultiple: boolean = false) => {
        setSelectedOptions((prev) => {
            if (isMultiple) {
                // Untuk addon: toggle
                const exists = prev.find((o) => o.id === option.id);
                if (exists) {
                    return prev.filter((o) => o.id !== option.id);
                }
                return [...prev, option];
            } else {
                // Untuk size/ice/sugar: replace dalam grup yang sama
                const filtered = prev.filter((o) => o.group !== option.group);
                return [...filtered, option];
            }
        });
    };

    // Cek apakah opsi dipilih
    const isOptionSelected = (optionId: string) => {
        return selectedOptions.some((o) => o.id === optionId);
    };

    // Hitung total harga
    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.extraPrice, 0);
    const totalPrice = (product.price + optionsPrice) * quantity;

    // Handle tambah ke keranjang
    const handleAddToCart = () => {
        addItem(product, quantity, selectedOptions, notes || undefined);
        toast.success(`${product.name} ditambahkan ke keranjang`, {
            description: `${quantity}x - ${formatPrice(totalPrice)}`,
            action: {
                label: "Lihat Keranjang",
                onClick: () => router.push("/cart"),
            },
        });
    };

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Menu
                </Link>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <Coffee className="h-32 w-32 text-primary/30" />
                    </div>

                    {/* Product Info & Customization */}
                    <div>
                        {/* Basic Info */}
                        <div className="mb-6">
                            {!product.isAvailable && (
                                <Badge variant="destructive" className="mb-2">
                                    Tidak Tersedia
                                </Badge>
                            )}
                            <h1 className="font-heading text-3xl font-bold md:text-4xl">
                                {product.name}
                            </h1>
                            <p className="mt-3 text-lg text-muted-foreground">
                                {product.description}
                            </p>
                            <p className="mt-4 text-2xl font-bold text-primary">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        {/* Customization Options */}
                        {availableGroups.length > 0 && (
                            <div className="space-y-6">
                                {availableGroups.map((group) => {
                                    const groupOptions = getProductOptionsByGroup(group);
                                    const isMultiple = group === "addon";

                                    return (
                                        <div key={group} className="border-t border-border pt-6">
                                            <h3 className="font-heading font-semibold mb-3">
                                                {groupLabels[group]}
                                                {!isMultiple && (
                                                    <span className="text-sm font-normal text-muted-foreground ml-2">
                                                        (Pilih satu)
                                                    </span>
                                                )}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {groupOptions.map((option) => {
                                                    const isSelected = isOptionSelected(option.id);
                                                    return (
                                                        <Button
                                                            key={option.id}
                                                            variant={isSelected ? "default" : "outline"}
                                                            size="sm"
                                                            className="gap-2"
                                                            onClick={() => handleSelectOption(option, isMultiple)}
                                                        >
                                                            {isSelected && <Check className="h-3 w-3" />}
                                                            {option.name}
                                                            {option.extraPrice > 0 && (
                                                                <span className="text-xs opacity-70">
                                                                    +{formatPrice(option.extraPrice)}
                                                                </span>
                                                            )}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Notes */}
                        <div className="border-t border-border pt-6 mt-6">
                            <h3 className="font-heading font-semibold mb-3">
                                Catatan
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                    (Opsional)
                                </span>
                            </h3>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Contoh: Jangan terlalu manis, pisahkan es..."
                                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                rows={2}
                            />
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="border-t border-border pt-6 mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-medium">Jumlah</span>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center font-bold text-lg">
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full gap-2"
                                onClick={handleAddToCart}
                                disabled={!product.isAvailable}
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Tambah ke Keranjang - {formatPrice(totalPrice)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
