import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Layout untuk halaman customer (dengan header dan footer)
export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
