"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ToastContainer } from "@/components/ui/toast";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Routes où le Navbar et le Footer ne doivent pas être affichés
    const hideLayout =
        pathname === ROUTES.LOGIN || pathname === ROUTES.PRE_REGISTRATION;

    return (
        <>
            {!hideLayout && <Navbar />}
            <main className="flex-1">{children}</main>
            {!hideLayout && <Footer />}
            <ToastContainer />
        </>
    );
}
