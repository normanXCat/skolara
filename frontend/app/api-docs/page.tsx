"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// SwaggerUI must be loaded dynamically for SSR support
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocsPage() {
    const [spec, setSpec] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const response = await fetch('/api/swagger-spec');
                const data = await response.json();
                setSpec(data);
            } catch (error) {
                console.error('Failed to fetch swagger spec', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpec();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <p className="font-bold uppercase tracking-widest text-xs opacity-50">Chargement de la documentation API...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <SwaggerUI spec={spec} />
            <style jsx global>{`
                .swagger-ui .topbar { display: none; }
                .swagger-ui .info .title { color: #0f172a; font-weight: 800; }
                .swagger-ui .scheme-container { background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
            `}</style>
        </div>
    );
}
