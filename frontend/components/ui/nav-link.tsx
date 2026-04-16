"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

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
        },
        defaultVariants: {
            variant: "default",
            size: "default",
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
            ...props
        },
        ref,
    ) => {
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
                className={cn(navLinkVariants({ variant, size, className }))}
                {...props}
            >
                {children}
                {showUnderline && (
                    <span
                        className={cn(
                            "absolute left-0 -bottom-1 h-0.5 w-0 origin-left rounded-full bg-primary transition-all duration-300 ease-out group-hover:w-full",
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
