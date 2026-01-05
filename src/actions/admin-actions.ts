"use server";

import { updateOrderStatus as updateStatusDb } from "@/lib/supabase/queries";
import { OrderStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(orderId: string, newStatus: OrderStatus) {
    try {
        const success = await updateStatusDb(orderId, newStatus);

        if (!success) {
            return { success: false, error: "Gagal mengupdate status pesanan" };
        }

        // Revalidate halaman admin agar data terbaru muncul
        revalidatePath("/admin/orders");
        revalidatePath(`/order/${orderId}`); // Update halaman detail customer juga

        return { success: true };
    } catch (error) {
        console.error("Update order status error:", error);
        return { success: false, error: "Terjadi kesalahan sistem" };
    }
}
