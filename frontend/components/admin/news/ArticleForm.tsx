"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { useArticleForm } from "@/hooks/useArticleForm";
import api from "@/lib/api-client";
import { Typography } from "@/components/ui/typography";
import InputReusable from "@/components/ui/input-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import WysiwygReusable from "../../shared/WysiwygReusable";
import { UploadReusable } from "@/components/ui/input-upload";
import { SelectReusable } from "@/components/ui/select-reusable";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { 
  IconChevronLeft, 
  IconDeviceFloppy, 
  IconRocket, 
  IconSettings, 
  IconArticle,
  IconEye
} from "@tabler/icons-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ArticleFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
  const {
    form,
    saveArticle,
    isSubmitting,
    isUploading,
    setThumbnailFile,
    currentStatus
  } = useArticleForm({ initialData, isEdit });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header Card Style - Matching Admin Grades Detail */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl shadow-2xl shadow-black/5">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.ADMIN.NEWS}>
            <ButtonReusable variant="outline" size="icon" className="rounded-2xl shrink-0">
              <IconChevronLeft size={20} />
            </ButtonReusable>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h2" className="text-2xl font-black tracking-tighter">
                {isEdit ? "Modifier l'Article" : "Nouvel Article"}
              </Typography>
              <Badge className="bg-primary text-primary-foreground border-none text-[9px] font-black uppercase px-2 py-0 h-5">
                BLOG
              </Badge>
            </div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-0.5 whitespace-nowrap">
              Administration • {isEdit ? "Mise à jour du contenu" : "Création de contenu communautaire"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ButtonReusable 
            variant="outline" 
            type="button"
            onClick={handleSubmit((data) => {
              setValue("status", "DRAFT");
              saveArticle({ ...data, status: "DRAFT" });
            })}
            isLoading={isSubmitting && currentStatus === "DRAFT"}
            leftIcon={<IconDeviceFloppy size={18} />}
          >
            Brouillon
          </ButtonReusable>
          <ButtonReusable 
            type="button"
            onClick={handleSubmit((data) => {
              setValue("status", "PUBLISHED");
              saveArticle({ ...data, status: "PUBLISHED" });
            })}
            isLoading={(isSubmitting && currentStatus === "PUBLISHED") || isUploading}
            leftIcon={<IconRocket size={18} />}
          >
            Publier
          </ButtonReusable>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Content Areas (3 columns) */}
        <div className="lg:col-span-3 space-y-8">
           <Card className="p-8 rounded-3xl border-border/50 relative overflow-hidden group border">
              <div className="absolute -top-24 -right-24 size-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
              
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputReusable 
                    id="title"
                    label="Titre de l'Actualité"
                    placeholder="Un titre accrocheur..."
                    register={register("title")}
                    error={errors.title?.message}
                  />

                  <InputReusable 
                    id="category"
                    label="Catégorie"
                    placeholder="Actualités, Événements..."
                    register={register("category")}
                    error={errors.category?.message}
                  />
                </div>

                <div className="space-y-4">
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <WysiwygReusable
                        id="content"
                        label="Corps de l'article"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.content?.message}
                        placeholder="Racontez votre histoire..."
                      />
                    )}
                  />
                </div>

                <div className="pt-4 border-t border-border/40">
                  <UploadReusable
                    label="Image à la une"
                    name="imageUploader"
                    defaultValue={watch("imageUrl") || undefined}
                    onFileChange={(file) => setThumbnailFile(file)}
                    error={errors.imageUrl?.message}
                    accept="image/*"
                  />
                </div>
              </div>
           </Card>
        </div>

        {/* Sidebar (1 column) */}
        <aside className="space-y-6">
           <Card className="p-6 rounded-3xl border-border/40 space-y-6 border">
              <div className="flex items-center gap-2 text-foreground/80 font-black tracking-widest text-sm mb-2">
                 <IconSettings size={16} />
                 Configuration
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SelectReusable
                      id="status"
                      label="Statut"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={[
                        { value: "DRAFT", label: "Brouillon" },
                        { value: "PUBLISHED", label: "Publié" },
                        { value: "ARCHIVED", label: "Archivé" },
                      ]}
                      error={errors.status?.message}
                    />
                  )}
                />
              </div>
           </Card>

           {/* Preview Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="p-6 rounded-3xl bg-primary/5 border-2 border-primary/10 space-y-4"
           >
              <div className="flex items-center gap-2 text-primary font-black text-sm">
                 <IconEye size={16} />
                 Aperçu Rapide
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Votre article sera visible par tous les élèves et parents une fois publié.
              </p>
              <div className="pt-2">
                 <ButtonReusable variant="outline" className="w-full">
                   Voir le rendu final
                 </ButtonReusable>
              </div>
           </motion.div>
        </aside>
      </form>
    </div>
  );
}

