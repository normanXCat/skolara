"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill: any = dynamic(() => import("react-quill-new"), { ssr: false });

export interface WysiwygReusableProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  id: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "link",
  "image",
  "code-block",
];

export default function WysiwygReusable({
  value,
  onChange,
  label,
  id,
  error,
  placeholder,
  disabled = false,
  className,
  defaultValue,
  onFocus,
  onBlur,
}: WysiwygReusableProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <div className="px-1">
          <Label
            htmlFor={id}
            className={cn(
              "transition-colors duration-300",
              isFocused ? "text-primary" : "text-foreground/70",
              error && "text-destructive",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </Label>
        </div>
      )}

      <div className="relative group min-h-[300px] flex flex-col">
        {/* Background & Glass effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-[2rem] transition-all duration-300 -z-10",
            "bg-muted/30 border border-border/40 backdrop-blur-sm",
            isFocused && "bg-background border-primary/30 ring-4 ring-primary/5",
            error && "border-destructive/50 bg-destructive/5",
            disabled && "opacity-50 grayscale-[0.5] cursor-not-allowed"
          )}
        />

        {/* Focus "Laser Border" Effect */}
        <AnimatePresence>
          {isFocused && !error && !disabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-[1px] -z-10 rounded-[2rem] overflow-hidden pointer-events-none"
            >
              <motion.div
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--primary)_40deg,transparent_80deg)]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Mask to keep only the border */}
              <div className="absolute inset-[1.5px] bg-background rounded-[2rem]" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col p-4"
        >
          <div className="wysiwyg-wrapper flex-1">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              readOnly={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                "h-full min-h-[250px]",
                error && "quill-error"
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="px-1 text-xs font-bold text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
