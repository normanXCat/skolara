"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormInput } from "@/lib/validations/contact";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await api.post("/contact/public", data);
      if (response.success) {
        setIsSuccess(true);
        form.reset();
        toast.success("Votre message a été envoyé avec succès !");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorMessage = response.error || "Une erreur est survenue.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = "Une erreur est survenue lors de l'envoi du message.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    isSuccess,
    error,
  };
}
