import { Suspense } from "react";
import { ContactMessageList } from "@/components/admin/contact/ContactMessageList";
import Link from "next/link";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { IconChevronLeft } from "@tabler/icons-react";

export const metadata = {
    title: "Messages de Contact | Skolara Admin",
    description: "Boîte de réception des messages depuis le site public",
};

export default function AdminContactPage() {
    return (
        <div className="space-y-6">
            <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <ButtonReusable variant="outline" size="icon">
                                <IconChevronLeft size={20} />
                            </ButtonReusable>
                        </Link>
                        <div className="flex flex-col">
                            <Typography variant="h2" className="text-2xl font-black">
                                Messagerie Contact
                            </Typography>
                            <Typography
                                variant="body"
                                className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest leading-none"
                            >
                                {new Date().toLocaleDateString("fr-FR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={
                <div className="h-[600px] w-full bg-muted/20 animate-pulse rounded-[2.5rem]" />
            }>
                <ContactMessageList />
            </Suspense>
        </div>
    );
}
