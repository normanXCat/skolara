"use client";

import React, { useEffect, useState } from "react";
import { SelectReusable } from "@/components/ui/select-reusable";
import { IconSchool } from "@tabler/icons-react";
import api from "@/lib/api-client";

interface Class {
    id: number;
    name: string;
    level: string;
}

export interface ClassSelectProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    label?: string;
}

let cachedClasses: Class[] | null = null;
let isFetching = false;
const fetchPromises: ((value: Class[]) => void)[] = [];

export function ClassSelect({
    value,
    onChange,
    placeholder = "Sélectionner une classe",
    disabled = false,
    error,
    className,
    label = "Classe"
}: ClassSelectProps) {
    const [classes, setClasses] = useState<Class[]>(cachedClasses || []);
    const [loading, setLoading] = useState(!cachedClasses);

    useEffect(() => {
        if (cachedClasses) {
            setClasses(cachedClasses);
            setLoading(false);
            return;
        }

        if (isFetching) {
            fetchPromises.push((data) => {
                setClasses(data);
                setLoading(false);
            });
            return;
        }

        isFetching = true;
        setLoading(true);

        api.get('/admin/classes')
            .then((res: any) => {
                const data = res?.data?.classes || [];
                cachedClasses = data;
                setClasses(data);
                fetchPromises.forEach(resolve => resolve(data));
                fetchPromises.length = 0;
            })
            .catch((err) => {
                console.error("[ClassSelect] Erreur de chargement:", err);
            })
            .finally(() => {
                setLoading(false);
                isFetching = false;
            });
    }, []);

    const options = classes.map(c => ({
        value: c.id.toString(),
        label: `${c.name} (${c.level})`,
    }));

    return (
        <SelectReusable
            id="class-select"
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
