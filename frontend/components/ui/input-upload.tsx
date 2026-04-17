"use client";

import React, { useState, useRef } from "react";
import {
    IconUpload,
    IconX,
    IconFileText,
    IconLoader2,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface InputUploadProps {
    label: string;
    name: string;
    accept?: string; // ex: "image/*,.pdf"
    maxSizeMB?: number; // taille max en Mo, défaut: 5
    onFileChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
    preview?: boolean; // afficher un aperçu si image
    isLoading?: boolean;
    defaultValue?: string; // URL existante (ex: après un upload et retour arrière)
    className?: string;
}

/**
 * Composant InputUpload réutilisable avec aperçu et validation de taille.
 */
export default function InputUpload({
    label,
    name,
    accept = "image/*,.pdf",
    maxSizeMB = 5,
    onFileChange,
    error,
    required = false,
    preview = true,
    isLoading = false,
    defaultValue,
    className,
}: InputUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        defaultValue || null,
    );
    const [localError, setLocalError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Synchroniser l'aperçu si la valeur par défaut change (ex: après l'upload serveur)
    React.useEffect(() => {
        if (defaultValue !== undefined) {
            setPreviewUrl(defaultValue || null);
            // Si la valeur est vidée par le parent, on reset le fichier local
            if (!defaultValue) setFile(null);
        }
    }, [defaultValue]);

    // Extraire un nom de fichier lisible à partir du fichier local ou de l'URL
    const getDisplayFileName = () => {
        if (file) return file.name;
        if (previewUrl && !previewUrl.startsWith("data:")) {
            // Tente d'extraire le nom du fichier de l'URL (ex: file-123.jpg)
            return previewUrl.split("/").pop();
        }
        return "Fichier sélectionné";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setLocalError(null);

        if (selectedFile) {
            // Validation de la taille
            if (selectedFile.size > maxSizeMB * 1024 * 1024) {
                const errMsg = `Le fichier est trop volumineux (max ${maxSizeMB} Mo)`;
                setLocalError(errMsg);
                return;
            }

            setFile(selectedFile);
            onFileChange(selectedFile);

            // Génération de l'aperçu si c'est une image
            if (preview && selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setLocalError(null);
        onFileChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const displayError = error || localError;

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            <Label
                htmlFor={name}
                className={cn(
                    "px-1 transition-colors duration-300",
                    displayError ? "text-destructive" : "text-foreground/70",
                )}
            >
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
            </Label>

            <div
                className={cn(
                    "relative group min-h-[120px] rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 overflow-hidden",
                    file
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/40 hover:border-primary/30 hover:bg-muted/30",
                    displayError && "border-destructive/40 bg-destructive/5",
                )}
                onClick={() =>
                    !file &&
                    !previewUrl &&
                    !isLoading &&
                    fileInputRef.current?.click()
                }
            >
                <input
                    type="file"
                    id={name}
                    name={name}
                    accept={accept}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                />

                <AnimatePresence mode="wait">
                    {!file && !previewUrl ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-2 cursor-pointer text-center"
                        >
                            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-1">
                                <IconUpload size={24} stroke={1.5} />
                            </div>
                            <p className="text-sm font-semibold">
                                Parcourir les fichiers
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {accept.includes("image") ? "Images " : ""}
                                {accept.includes("pdf") ? "PDF " : ""}
                                (max {maxSizeMB} Mo)
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="selected"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center w-full gap-3"
                        >
                            {previewUrl &&
                            (file?.type.startsWith("image/") ||
                                previewUrl.startsWith("data:image/") ||
                                !previewUrl.toLowerCase().endsWith(".pdf")) ? (
                                <div className="relative size-24 rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                                    <img
                                        key={previewUrl}
                                        src={previewUrl}
                                        alt="Aperçu"
                                        className="size-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="size-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                                    <IconFileText size={32} stroke={1.5} />
                                </div>
                            )}

                            <div className="flex flex-col items-center max-w-full">
                                <p className="text-sm font-bold truncate max-w-[200px]">
                                    {getDisplayFileName()}
                                </p>
                                {file && (
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        Mo
                                    </p>
                                )}
                            </div>

                            {!isLoading && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                    className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-md border border-border/40 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all shadow-sm"
                                >
                                    <IconX size={16} stroke={2} />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading Overlay */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2"
                        >
                            <IconLoader2 className="size-8 text-primary animate-spin" />
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">
                                Téléchargement...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {displayError && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="px-1 text-xs font-bold text-destructive"
                    >
                        {displayError}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
