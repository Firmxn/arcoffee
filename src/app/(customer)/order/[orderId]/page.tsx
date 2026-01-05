"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    Coffee,
    ChefHat,
    Package,
    XCircle,
    Phone,
    Copy,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/data/mock-data";
import { Order, OrderStatus } from "@/types";
import { toast } from "sonner";

// Konfigurasi status order
const statusConfig: Record<OrderStatus, {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
}> = {
    pending: {
        label: "Menunggu Konfirmasi",
        icon: Clock,
        color: "bg-yellow-500",
        description: "Pesanan Anda sedang menunggu konfirmasi dari barista.",
    },
    processing: {
        label: "Sedang Diproses",
        icon: ChefHat,
        color: "bg-blue-500",
        description: "Barista sedang menyiapkan pesanan Anda.",
    },
    ready: {
        label: "Siap Diambil",
        icon: Package,
        color: "bg-green-500",
        description: "Pesanan Anda sudah siap! Silakan ambil di counter.",
    },
    completed: {
        label: "Selesai",
        icon: CheckCircle2,
        color: "bg-gray-500",
        description: "Terima kasih! Pesanan telah selesai.",
    },
    cancelled: {
        label: "Dibatalkan",
        icon: XCircle,
        color: "bg-red-500",
        description: "Pesanan dibatalkan.",
    },
};

// Urutan status untuk progress indicator
const statusOrder: OrderStatus[] = ["pending", "processing", "ready", "completed"];

export default function OrderStatusPage() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    // Load order dari localStorage
    useEffect(() => {
        const loadOrder = () => {
            const orders = JSON.parse(localStorage.getItem("arcoffee-orders") || "[]");
            const foundOrder = orders.find((o: Order) => o.id === orderId);
            setOrder(foundOrder || null);
            setIsLoading(false);
        };

        loadOrder();
    }, [orderId]);

    // Copy order ID ke clipboard
    const copyOrderId = async () => {
        await navigator.clipboard.writeText(orderId);
        setCopied(true);
        toast.success("Order ID disalin!");
        setTimeout(() => setCopied(false), 2000);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="py-20 text-center">
                <Coffee className="mx-auto h-16 w-16 text-primary animate-pulse" />
                <p className="mt-4 text-muted-foreground">Memuat pesanan...</p>
            </div>
        );
    }

    // Order not found
    if (!order) {
        return (
            <div className="py-20 text-center">
                <XCircle className="mx-auto h-16 w-16 text-destructive/50" />
                <h3 className="mt-4 font-heading text-xl font-semibold">
                    Pesanan tidak ditemukan
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Order ID: {orderId} tidak ditemukan dalam sistem.
                </p>
                <Link href="/menu" className="mt-6 inline-block">
                    <Button>Kembali ke Menu</Button>
                </Link>
            </div>
        );
    }

    const currentStatus = (order.status || "pending") as OrderStatus;
    const config = statusConfig[currentStatus];
    const StatusIcon = config.icon;
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    return (
        <div className="py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Pesan Lagi
                    </Link>
                </div>

                {/* Order Status Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    {/* Status Header */}
                    <div className={`${config.color} p-6 text-white text-center`}>
                        <StatusIcon className="mx-auto h-16 w-16 mb-4" />
                        <h1 className="font-heading text-2xl font-bold">{config.label}</h1>
                        <p className="mt-2 text-white/80">{config.description}</p>
                    </div>

                    {/* Order Info */}
                    <div className="p-6">
                        {/* Order ID */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Order ID</p>
                                <p className="font-mono font-bold text-lg">{orderId}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={copyOrderId}>
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {/* Progress Indicator */}
                        {currentStatus !== "cancelled" && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    {statusOrder.slice(0, -1).map((status, index) => {
                                        const isCompleted = index <= currentStatusIndex;
                                        const isActive = index === currentStatusIndex;
                                        const StepIcon = statusConfig[status].icon;

                                        return (
                                            <div key={status} className="flex-1 relative">
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted
                                                                ? "bg-primary text-primary-foreground"
                                                                : "bg-muted text-muted-foreground"
                                                            } ${isActive ? "ring-4 ring-primary/20" : ""}`}
                                                    >
                                                        <StepIcon className="h-5 w-5" />
                                                    </div>
                                                    <p
                                                        className={`mt-2 text-xs text-center ${isCompleted
                                                                ? "text-foreground font-medium"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {statusConfig[status].label.split(" ")[0]}
                                                    </p>
                                                </div>
                                                {/* Connector line */}
                                                {index < statusOrder.length - 2 && (
                                                    <div
                                                        className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 ${index < currentStatusIndex
                                                                ? "bg-primary"
                                                                : "bg-muted"
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Customer Info */}
                        <div className="border-t border-border pt-6 mb-6">
                            <h3 className="font-heading font-semibold mb-3">Data Pelanggan</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Nama</span>
                                    <span className="font-medium">{order.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Telepon</span>
                                    <a
                                        href={`tel:${order.customerPhone}`}
                                        className="font-medium text-primary flex items-center gap-1"
                                    >
                                        <Phone className="h-3 w-3" />
                                        {order.customerPhone}
                                    </a>
                                </div>
                                {order.notes && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Catatan</span>
                                        <span className="font-medium text-right max-w-[200px]">
                                            {order.notes}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-border pt-6 mb-6">
                            <h3 className="font-heading font-semibold mb-3">Rincian Pesanan</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between py-2 border-b border-border last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.quantity}x {item.product.name}
                                            </p>
                                            {item.selectedOptions.length > 0 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {item.selectedOptions.map((opt) => opt.name).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                        <p className="font-medium">{formatPrice(item.subtotal)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-border pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">{formatPrice(order.totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href="/menu" className="flex-1">
                        <Button variant="outline" className="w-full">
                            Pesan Lagi
                        </Button>
                    </Link>
                    <Link href="/" className="flex-1">
                        <Button className="w-full">Kembali ke Beranda</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
