"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { ToastContainer } from "@/components/ui/toast";
import { NetworkStatus } from "@/components/ui/network-status";

interface LayoutWrapperProps {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
}

export function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Routes où le Navbar et le Footer ne doivent pas être affichés
    const hideLayout =
        pathname === ROUTES.LOGIN ||
        pathname === ROUTES.PRE_REGISTRATION ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/teacher");

    return (
        <>
            {!hideLayout && navbar}
            <main className="flex-1">{children}</main>
            {!hideLayout && footer}
            <ToastContainer />
            <NetworkStatus />
        </>
    );
}

