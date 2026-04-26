"use client";

import React, { useEffect, useState } from "react";
import { SelectReusable } from "@/components/ui/select-reusable";
import { MultiSelectReusable } from "@/components/ui/multi-select-reusable";
import { IconBook, IconLoader2 } from "@tabler/icons-react";
import api from "@/lib/api-client";

interface Subject {
    id: number;
    name: string;
    code: string;
    coefficient: number;
}

export interface SubjectSelectProps {
    value?: string | string[]; // Adapté pour s'intégrer facilement avec React Hook Form
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    label?: string;
}

// Cache global mémoire pour éviter les requêtes en boucle
let cachedSubjects: Subject[] | null = null;
let isFetching = false;
const fetchPromises: ((value: Subject[]) => void)[] = [];

/**
 * Composant de sélection de Matières (Subjects).
 * Supporte le mode simple (SelectReusable) et le mode multiple (MultiSelectReusable).
 */
export function SubjectSelect({
    value,
    onChange,
    multiple = false,
    placeholder = "Sélectionner une matière",
    disabled = false,
    error,
    className,
    label = "Matière(s)"
}: SubjectSelectProps) {
    const [subjects, setSubjects] = useState<Subject[]>(cachedSubjects || []);
    const [loading, setLoading] = useState(!cachedSubjects);

    useEffect(() => {
        if (cachedSubjects) {
            setSubjects(cachedSubjects);
            setLoading(false);
            return;
        }

        if (isFetching) {
            fetchPromises.push((data) => {
                setSubjects(data);
                setLoading(false);
            });
            return;
        }

        isFetching = true;
        setLoading(true);

        api.get('/admin/subjects')
            .then((res: any) => {
                const data = res?.data?.subjects || [];
                cachedSubjects = data;
                setSubjects(data);
                fetchPromises.forEach(resolve => resolve(data));
                fetchPromises.length = 0;
            })
            .catch((err) => {
                console.error("[SubjectSelect] Erreur de chargement:", err);
            })
            .finally(() => {
                setLoading(false);
                isFetching = false;
            });
    }, []);

    const options = subjects.map(s => ({
        value: s.id.toString(), // On utilise l'ID pour le backend
        label: `${s.name} (${s.code})`,
        name: s.name // On garde le nom pour la spécialité
    }));

    if (!multiple) {
        return (
            <SelectReusable
                id="subject-select"
                label={label}
                value={(value as string) || ""}
                onValueChange={(val) => onChange(val)}
                options={options}
                placeholder={placeholder}
                disabled={disabled}
                isLoading={loading}
                error={error}
                icon={IconBook}
                className={className}
            />
        );
    }

    // Mode Multi-Select avec le nouveau composant réutilisable
    const arrayValue = Array.isArray(value) ? value : (value ? (value as string).split(',').map(v => v.trim()) : []);

    return (
        <MultiSelectReusable
            id="subject-select-multi"
            label={label}
            placeholder={placeholder}
            options={options}
            value={arrayValue}
            onValueChange={(val) => onChange(val)}
            error={error}
            disabled={disabled}
            isLoading={loading}
            icon={IconBook}
            className={className}
        />
    );
}
