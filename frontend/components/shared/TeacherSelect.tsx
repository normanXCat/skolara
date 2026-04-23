"use client";

import React, { useEffect, useState } from "react";
import { SelectReusable } from "@/components/ui/select-reusable";
import { IconUser, IconLoader2 } from "@tabler/icons-react";
import api from "@/lib/api-client";

interface Teacher {
    id: number;
    user: {
        firstName: string;
        name: string;
    };
}

export interface TeacherSelectProps {
    value?: string | number | null;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    label?: string;
}

/**
 * Composant de sélection d'Enseignants (Teachers).
 */
export function TeacherSelect({
    value,
    onChange,
    placeholder = "Sélectionner un enseignant",
    disabled = false,
    error,
    className,
    label = "Enseignant principal"
}: TeacherSelectProps) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/teachers')
            .then((res: any) => {
                setTeachers(res?.data?.teachers || []);
            })
            .catch((err) => {
                console.error("[TeacherSelect] Erreur de chargement:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const options = teachers.map(t => ({
        value: t.id.toString(),
        label: `${t.user.firstName} ${t.user.name}`,
    }));

    return (
        <SelectReusable
            id="teacher-select"
            label={label}
            value={value?.toString() || ""}
            onValueChange={onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            isLoading={loading}
            error={error}
            icon={IconUser}
            className={className}
        />
    );
}
