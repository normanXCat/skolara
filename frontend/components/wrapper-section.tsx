import { cn } from "@/lib/utils";

/**
 * Wrapper de section appliquant un padding X standard.
 *
 * @param props - Propriétés du composant.
 * @param props.children - Contenu de la section.
 * @param props.className - Classes additionnelles optionnelles.
 * @returns JSX de la section.
 */
export default function WrapperSection({
    children,
    className,
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <section
            id={id}
            className={cn("relative px-5 md:px-[5%] 2xl:px-[10%]", className)}
        >
            {children}
        </section>
    );
}
