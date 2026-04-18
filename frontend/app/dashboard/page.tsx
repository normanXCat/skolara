"use client";

import React from "react";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { useRouter } from "next/navigation";
import api from "@/lib/api-client";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const res = await api.get<any>("/auth/me");
            if (res.success) {
                setUser(res.data);
            } else {
                router.push("/login");
            }
        };
        fetchProfile();
    }, [router]);

    const handleLogout = async () => {
        await api.post("/auth/logout");
        router.push("/login");
    };

    if (!user) return <div className="p-10">Chargement...</div>;

    return (
        <div className="p-10 space-y-6">
            <Typography variant="h1">Dashboard</Typography>
            <div className="p-6 border border-border rounded-xl bg-card">
                <Typography variant="h3">
                    Bienvenue, {user.firstName} {user.name} !
                </Typography>
                <Typography variant="body" className="text-muted-foreground">
                    Rôle : {user.role}
                </Typography>
            </div>
            <ButtonReusable onClick={handleLogout} variant="outline">
                Se déconnecter
            </ButtonReusable>
        </div>
    );
}
