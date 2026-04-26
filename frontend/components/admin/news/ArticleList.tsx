"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable } from "../DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Typography } from "@/components/ui/typography";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { StatusBadge } from "../StatusBadge";
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconEye,
  IconClock,
  IconPhoto,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ButtonReusable } from "@/components/ui/button-reusable";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface Article {
  id: number;
  title: string;
  category: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  createdAt: string;
  author: {
    fullName: string;
  };
}

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Article[]>("/news/admin");
      if (response.success) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      const response = await api.delete(`/news/admin/${id}`);
      if (response.success) {
        setArticles(prev => prev.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete article", error);
    }
  };

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-foreground">{row.original.title}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-black">{row.original.category || "Sans catégorie"}</span>
        </div>
      ),
    },
    {
      accessorKey: "author.fullName",
      header: "Auteur",
      cell: ({ row }) => row.original.author?.fullName || "Inconnu",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <StatusBadge 
            status={status === "PUBLISHED" ? "accepted" : status === "DRAFT" ? "pending" : "rejected"} 
          />
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: "Publication",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <IconClock size={14} className="opacity-50" />
          {row.original.publishedAt 
            ? format(new Date(row.original.publishedAt), "dd MMM yyyy", { locale: fr })
            : "Non publié"
          }
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
           <Link href={`/blog`} target="_blank" className="p-2 rounded-xl bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
             <IconEye size={18} />
           </Link>
           <Link href={ROUTES.ADMIN.NEWS_EDIT(row.original.id)} className="p-2 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
             <IconEdit size={18} />
           </Link>
           <button 
             onClick={() => handleDelete(row.original.id)}
             className="p-2 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
           >
             <IconTrash size={18} />
           </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
           <Typography variant="h1">News & Blog</Typography>
           <Typography className="text-muted-foreground">Gérez les articles et actualités de l'académie.</Typography>
        </div>
        <Link href={ROUTES.ADMIN.NEWS_NEW}>
          <ButtonReusable leftIcon={<IconPlus size={20} />}  variant="default">
             Nouvel Article
          </ButtonReusable>
        </Link>
      </header>

      <div className="">
        <DataTable 
          columns={columns} 
          data={articles} 
          isLoading={isLoading}
          searchPlaceholder="Rechercher un article..."
        />
      </div>
    </div>
  );
}
