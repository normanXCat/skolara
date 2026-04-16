"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";

/**
 * Reusable Back Button using ButtonReusable.
 */
export function ButtonBack({
    className,
    text = "Retour",
}: {
    className?: string;
    text?: string;
}) {
    const router = useRouter();

    return (
        <ButtonReusable
            variant="outline"
            size="lg"
            leftIcon={<IconArrowLeft size={18} />}
            onClick={() => router.back()}
            className={className}
        >
            {text}
        </ButtonReusable>
    );
}

export default ButtonBack;
