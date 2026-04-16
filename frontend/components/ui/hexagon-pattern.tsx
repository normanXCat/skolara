"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface HexagonPatternProps {
    radius?: number;
    x?: number | string;
    y?: number | string;
    className?: string;
    [key: string]: any;
}

/**
 * HexagonPattern component from Magic UI style.
 */
export function HexagonPattern({
    radius = 20,
    x = -1,
    y = -1,
    className,
    ...props
}: HexagonPatternProps) {
    const id = useId();
    const width = radius * 2;
    const height = radius * 1.73205;

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-none stroke-neutral-400/30",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M${radius} 0L${radius * 2} ${radius * 0.4330125}L${radius * 2} ${radius * 1.2990375}L${radius} ${radius * 1.73205}L0 ${radius * 1.2990375}L0 ${radius * 0.4330125}Z`}
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
}

export default HexagonPattern;
