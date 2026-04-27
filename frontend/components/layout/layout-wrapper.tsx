"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { ToastContainer } from "@/components/ui/toast";
import { NetworkStatus } from "@/components/ui/network-status";
import { toast } from "@/lib/toast-store";

interface LayoutWrapperProps {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
}

export function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Routes où le Navbar et le Footer ne doivent pas être affichés
    const hideLayout =
        pathname === ROUTES.LOGIN ||
        pathname === ROUTES.PRE_REGISTRATION ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/teacher");

    useEffect(() => {
        if (searchParams.get("accessDenied") !== "1") return;

        toast.warning("Acces refuse: vous n'avez pas les permissions pour cet espace.");

        const params = new URLSearchParams(searchParams.toString());
        params.delete("accessDenied");
        const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;
        router.replace(nextUrl);
    }, [pathname, router, searchParams]);

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

