"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Fournisseur de thème pour l'application.
 * Enveloppe l'application pour permettre le basculement entre mode clair et sombre.
 */

// Suppress the React 19 warning about the script tag in next-themes
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const orig = console.error;
    console.error = (...args: unknown[]) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes("Encountered a script tag")
        ) {
            return;
        }
        orig.apply(console, args);
    };
}

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
