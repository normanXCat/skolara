"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkVariants = cva(
    "group relative inline-flex items-center transition-all duration-300 ease-out",
    {
        variants: {
            variant: {
                default: "text-foreground/70 hover:text-primary",
                footer: "text-muted-foreground hover:text-primary",
                ghost: "hover:text-primary",
            },
            size: {
                default: "text-base font-semibold px-2 py-2.5",
                sm: "text-sm font-semibold",
                xs: "text-xs font-medium uppercase tracking-wider",
                lg: "text-lg font-bold",
            },
            isActive: {
                true: "text-primary",
                false: "",
            },
        },
        compoundVariants: [
            {
                variant: "default",
                isActive: true,
                className: "text-primary font-bold",
            },
        ],
        defaultVariants: {
            variant: "default",
            size: "default",
            isActive: false,
        },
    },
);

interface NavLinkProps
    extends
        Omit<HTMLMotionProps<"a">, "children">,
        VariantProps<typeof navLinkVariants> {
    href: string;
    children: React.ReactNode;
    underlineClassName?: string;
    showUnderline?: boolean;
    exact?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    (
        {
            href,
            children,
            variant,
            size,
            className,
            underlineClassName,
            showUnderline = true,
            exact = false,
            ...props
        },
        ref,
    ) => {
        const pathname = usePathname();

        // Détecter si le lien est actif
        const isActive = exact
            ? pathname === href
            : pathname?.startsWith(href) && (href !== "/" || pathname === "/");

        // Détecter si c'est un lien externe
        const isExternal =
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:");

        const Comp = isExternal ? motion.a : motion(Link);

        return (
            <Comp
                ref={ref as any}
                href={href}
                className={cn(
                    navLinkVariants({ variant, size, isActive, className }),
                )}
                {...props}
            >
                {children}
                {showUnderline && (
                    <span
                        className={cn(
                            "absolute left-0 -bottom-1 h-0.5 origin-left rounded-full bg-primary transition-all duration-300 ease-out",
                            isActive ? "w-full" : "w-0 group-hover:w-full",
                            underlineClassName,
                        )}
                    />
                )}
            </Comp>
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink, navLinkVariants };
