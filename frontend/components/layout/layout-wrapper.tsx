"use client";

import { useEffect, Suspense, createContext } from "react";
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

export const LayoutContext = createContext<{
    navbar: React.ReactNode;
    footer: React.ReactNode;
}>({ navbar: null, footer: null });

function AccessDeniedHandler() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("accessDenied") !== "1") return;

        toast.warning("Acces refuse: vous n'avez pas les permissions pour cet espace.");

        const params = new URLSearchParams(searchParams.toString());
        params.delete("accessDenied");
        const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;
        router.replace(nextUrl);
    }, [pathname, router, searchParams]);

    return null;
}

export function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Routes où le Navbar et le Footer ne doivent pas être affichés
    const hideLayout =
        pathname === ROUTES.LOGIN ||
        pathname === ROUTES.PRE_REGISTRATION ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/teacher") ||
        pathname.startsWith("/student");

    return (
        <LayoutContext.Provider value={{ navbar, footer }}>
            <Suspense fallback={null}>
                <AccessDeniedHandler />
            </Suspense>
            {!hideLayout && navbar}
            <main className="flex-1">{children}</main>
            {!hideLayout && footer}
            <ToastContainer />
            <NetworkStatus />
        </LayoutContext.Provider>
    );
}
