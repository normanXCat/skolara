"use client";

import React, { useEffect, useState } from "react";
import { SelectReusable } from "@/components/ui/select-reusable";
import { IconSchool } from "@tabler/icons-react";
import api from "@/lib/api-client";

interface SchoolLevel {
    id: number;
    value: string;
    label: string;
}

export interface LevelSelectProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    label?: string;
}

/**
 * Composant de sélection de Niveaux Scolaires (Levels).
 */
export function LevelSelect({
    value,
    onChange,
    placeholder = "Sélectionner un niveau",
    disabled = false,
    error,
    className,
    label = "Niveau"
}: LevelSelectProps) {
    const [levels, setLevels] = useState<SchoolLevel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/grades')
            .then((res: any) => {
                setLevels(res?.data || []);
            })
            .catch((err) => {
                console.error("[LevelSelect] Erreur de chargement:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const options = levels.map(l => ({
        value: l.value,
        label: l.label,
    }));

    return (
        <SelectReusable
            id="level-select"
            label={label}
            value={value || ""}
            onValueChange={onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            isLoading={loading}
            error={error}
            icon={IconSchool}
            className={className}
        />
    );
}
